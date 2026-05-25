const express = require('express');
const { uploadNotes, getNotes, getNotesSem, getNotesSemSub, getAllNotes, getNotesByUser, deleteNote } = require('../controllers/NotesController');
const singleUpload = require('../middleware/multer');

const router = express.Router();

router.get('/allnotes', getAllNotes)
router.get('/name/:postedBy', getNotesByUser)
router.delete('/delete/:id', deleteNote)
router.get('/:branch', getNotes)
router.get('/:branch/:semester', getNotesSem);
router.get('/:branch/:semester/:subject', getNotesSemSub);
router.post('/upload',singleUpload, uploadNotes)

module.exports = router;
