const express = require('express');
const { getProfile, updateProfile, uploadAvatar } = require('../controllers/ProfileController');
const singleUpload = require('../middleware/multer');

const router = express.Router();

router.get('/:email', getProfile);
router.post('/', updateProfile);
router.post('/upload-avatar', singleUpload, uploadAvatar);

module.exports = router;
