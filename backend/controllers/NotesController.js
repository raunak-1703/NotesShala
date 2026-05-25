const Notes = require("../models/NotesModel");
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
        const { postedBy, branch, semester, subject } = req.body;
        const file = req.file;

        if (!postedBy || !branch || !semester || !subject || !file) {
            return res.status(400).json({ message: 'PostedBy, branch, semester, subject, and file are required' })
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

const getNotesByUser = async (req, res) => {
    const { postedBy } = req.params;
    try {
        const notes = await Notes.find({ postedBy });
        res.status(200).json(notes);
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

        res.status(200).json(notes);
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

        res.status(200).json(notes);
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
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotes', error.message)
    }
}

const getNotesSemSub = async (req, res) => {
    const { branch, semester, subject } = req.params;
    try {
        const notes = await Notes.find({ branch: branch, semester: semester, subject: subject });

        if (notes.length === 0) {
            return res.status(404).json({ error: "Notes not found" });
        }

        res.status(200).json(notes);
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

module.exports = { uploadNotes, getAllNotes, getNotes, getNotesSem, getNotesSemSub, getNotesByUser, deleteNote };
