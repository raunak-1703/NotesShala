const Notes = require("../models/NotesModel");
const Profile = require("../models/ProfileModel");
const { google } = require('googleapis');
const stream = require('stream');

// Initialize Google OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

// Set the refresh token so the app can automatically stay logged in
oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const getDriveFileId = (note) => {
    if (note.driveFileId) {
        return note.driveFileId;
    }

    const match = note.file?.match(/\/d\/([^/]+)/);
    return match?.[1];
};

const uploadNotes = async (req, res) => {
    try {
        const { postedBy, branch, semester, subject, subjectCode, description } = req.body;
        const file = req.file;
        const tags = typeof req.body.tags === 'string'
            ? req.body.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
            : [];

        if (!postedBy || !branch || !semester || !subject || !file) {
            return res.status(400).json({ message: 'PostedBy, branch, semester, subject, and file are required' })
        }

        if (description) {
            const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
            if (wordCount > 50) {
                return res.status(400).json({ message: 'Description must be 50 words or less' });
            }
        }

        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        
        const { data } = await google.drive({ version: "v3", auth: oauth2Client }).files.create({
            media: {
                mimeType: file.mimetype,
                body: bufferStream,
            },
            requestBody: {
                name: file.originalname,
                parents: [process.env.GOOGLE_DRIVE_PARENT]
            },
            fields: "id,name"
        });

        const newNotes = new Notes({
            postedBy,
            branch,
            semester,
            subject,
            subjectCode,
            tags,
            description,
            file: `https://drive.google.com/file/d/${data.id}`,
            driveFileId: data.id,
            fileName: data.name,
            mimeType: file.mimetype,
        });
        await newNotes.save();

        res.status(200).json( newNotes )
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in uploadNotes', error.message)
    }
}

const enrichNotesWithUploaderInfo = async (notes) => {
    if (!notes) return [];
    const notesArray = Array.isArray(notes) ? notes : [notes];
    return await Promise.all(notesArray.map(async (note) => {
        const profile = await Profile.findOne({ email: note.postedBy.toLowerCase() });
        return {
            ...note.toObject(),
            uploaderName: profile?.name || note.postedBy.split('@')[0],
            uploaderAvatar: profile?.avatar || '/user.svg',
            uploaderRegistrationNumber: profile?.registrationNumber || note.postedBy.split('@')[0].toUpperCase()
        };
    }));
};

const getNotesByUser = async (req, res) => {
    const { postedBy } = req.params;
    try {
        const notes = await Notes.find({ postedBy });
        const enriched = await enrichNotesWithUploaderInfo(notes);
        res.status(200).json(enriched);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotesByUser', error.message)
    }
}

const getAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find()
        if (!notes) return res.status(400).json({ error: "Notes not found" });

        const enriched = await enrichNotesWithUploaderInfo(notes);
        res.status(200).json(enriched);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotes', error.message)
    }
}

const getNotes = async (req, res) => {
    const { branch } = req.params
    try {
        const notes = await Notes.find({ branch })
        if (!notes) return res.status(400).json({ error: "Notes not found" });

        const enriched = await enrichNotesWithUploaderInfo(notes);
        res.status(200).json(enriched);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotes', error.message)
    }
}

const getNotesSem = async (req, res) => {
    const { branch, semester } = req.params;
    try {
        const notes = await Notes.find({ branch: branch, semester: semester });
        const enriched = await enrichNotesWithUploaderInfo(notes);
        res.status(200).json(enriched);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotes', error.message)
    }
}

const getRecommendedNotes = async (req, res) => {
    try {
        const notes = await Notes.find().sort({ createdAt: -1 }).limit(6);
        const enriched = await enrichNotesWithUploaderInfo(notes);
        res.status(200).json(enriched);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getRecommendedNotes', error.message)
    }
}

const getNotesSemSub = async (req, res) => {
    const { branch, semester, subject } = req.params;
    try {
        const notes = await Notes.find({
            branch: branch,
            semester: semester,
            $or: [
                { subject: subject },
                { subjectCode: subject },
            ],
        });

        if (notes.length === 0) {
            return res.status(404).json({ error: "Notes not found" });
        }

        const enriched = await enrichNotesWithUploaderInfo(notes);
        res.status(200).json(enriched);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotes', error.message)
    }
}

const deleteNote = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        const driveFileId = getDriveFileId(note);
        if (driveFileId) {
            try {
                await google.drive({ version: "v3", auth: oauth2Client }).files.delete({ fileId: driveFileId });
            }
            catch (error) {
                if (error.code !== 404) {
                    throw error;
                }
            }
        }

        await Notes.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Note deleted successfully' })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in deleteNote', error.message)
    }
}

const getStats = async (req, res) => {
    try {
        const notesCount = await Notes.countDocuments();
        const profilesCount = await Profile.countDocuments();
        res.status(200).json({
            activeUsers: profilesCount,
            notesShared: notesCount
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getStats', error.message)
    }
}

const searchNotes = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || q.trim() === '') {
            const notes = await Notes.find();
            const enriched = await enrichNotesWithUploaderInfo(notes);
            return res.status(200).json(enriched);
        }

        const queryRegex = new RegExp(q.trim(), 'i');

        // Initial regex query in Mongo
        const notes = await Notes.find({
            $or: [
                { subject: queryRegex },
                { subjectCode: queryRegex },
                { semester: queryRegex },
                { branch: queryRegex },
                { tags: { $in: [queryRegex] } },
                { description: queryRegex },
                { fileName: queryRegex }
            ]
        });

        // Enrich uploader name from Profile database
        const enriched = await enrichNotesWithUploaderInfo(notes);

        // Filter results by enriched name and original fields
        const qLower = q.trim().toLowerCase();
        const finalNotes = enriched.filter(note => 
            note.uploaderName.toLowerCase().includes(qLower) ||
            note.postedBy.toLowerCase().includes(qLower) ||
            note.subject.toLowerCase().includes(qLower) ||
            (note.subjectCode && note.subjectCode.toLowerCase().includes(qLower)) ||
            note.semester.toLowerCase().includes(qLower) ||
            note.branch.toLowerCase().includes(qLower) ||
            (note.description && note.description.toLowerCase().includes(qLower)) ||
            (note.fileName && note.fileName.toLowerCase().includes(qLower)) ||
            note.tags.some(tag => tag.toLowerCase().includes(qLower))
        );

        res.status(200).json(finalNotes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in searchNotes', error.message);
    }
}

module.exports = { uploadNotes, getAllNotes, getNotes, getNotesSem, getNotesSemSub, getNotesByUser, getRecommendedNotes, deleteNote, getStats, searchNotes };
