const multer = require('multer')

const storage = multer.memoryStorage();
const MAX_FILE_SIZE = 500 * 1024 * 1024;

const upload = multer({
    storage,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
});

const singleUpload = (req, res, next) => {
    upload.single('file')(req, res, (error) => {
        if (!error) {
            return next();
        }

        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File size must be 500 MB or less' });
        }

        return res.status(400).json({ message: error.message });
    });
};

module.exports = singleUpload;
