const express = require('express');
const { register, verifyOtp, login, forgotPassword, resetPassword, resendOtp } = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/resend-otp', resendOtp);

module.exports = router;
