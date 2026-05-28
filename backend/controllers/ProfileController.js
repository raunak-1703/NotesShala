const Profile = require('../models/ProfileModel');
const cloudinary = require('cloudinary').v2;

const getProfile = async (req, res) => {
    try {
        const { email } = req.params;
        const profile = await Profile.findOne({ email: email.toLowerCase() });
        res.status(200).json(profile || {});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getProfile', error.message);
    }
};

const updateProfile = async (req, res) => {
    try {
        const { email, name, avatar, branch, collegeYear, semester } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const profile = await Profile.findOneAndUpdate(
            { email: email.toLowerCase() },
            { email, name, avatar, branch, collegeYear, semester },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json(profile);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in updateProfile', error.message);
    }
};

const uploadAvatar = async (req, res) => {
    try {
        const file = req.file;
        const oldAvatarUrl = req.body.oldAvatarUrl;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Delete old avatar if provided
        if (oldAvatarUrl && oldAvatarUrl.includes('cloudinary.com')) {
            try {
                const urlParts = oldAvatarUrl.split('/');
                const filename = urlParts.pop().split('.')[0];
                const folder = urlParts.pop();
                const public_id = `${folder}/${filename}`;
                await cloudinary.uploader.destroy(public_id);
            } catch (err) {
                console.log('Error deleting old avatar', err.message);
            }
        }

        const stream = require('stream');
        const uploadToCloudinary = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'noteshala_avatars' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result.secure_url);
                    }
                );
                const bufferStream = new stream.PassThrough();
                bufferStream.end(fileBuffer);
                bufferStream.pipe(uploadStream);
            });
        };

        const avatarUrl = await uploadToCloudinary(file.buffer);
        res.status(200).json({ avatarUrl });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in uploadAvatar', error.message);
    }
};

module.exports = { getProfile, updateProfile, uploadAvatar };
