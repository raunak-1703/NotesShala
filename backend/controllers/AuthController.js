const Profile = require('../models/ProfileModel');
const Otp = require('../models/OtpModel');
const OtpRequestLog = require('../models/OtpRequestLog');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email');
const generateEmailTemplate = require('../utils/emailTemplate');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const checkEmailRateLimit = async (email) => {
    return; // TEMPORARILY DISABLED for testing
    // Count how many requests were made by this email in the last hour
    const count = await OtpRequestLog.countDocuments({ email: email.toLowerCase() });
    if (count >= 5) {
        throw new Error('Too many OTP requests. Please wait an hour before trying again.');
    }
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });

        await checkEmailRateLimit(email);

        const existingUser = await Profile.findOne({ email: email.toLowerCase() });
        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const registrationNumber = email.split('@')[0].toUpperCase();

        if (existingUser) {
            existingUser.password = hashedPassword;
            existingUser.name = name;
            await existingUser.save();
        } else {
            await Profile.create({
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
                registrationNumber,
                isVerified: false
            });
        }

        // Generate and send OTP
        const otp = generateOTP();
        await Otp.deleteMany({ email: email.toLowerCase(), purpose: 'verification' });
        await Otp.create({ email: email.toLowerCase(), otp, purpose: 'verification' });

        await sendEmail({
            to: email,
            subject: 'NoteShaala - Verify your email',
            text: `Your OTP for email verification is: ${otp}. It is valid for 10 minutes.`,
            html: generateEmailTemplate(otp, 'verification')
        });

        // Log the request for rate limiting
        await OtpRequestLog.create({ email: email.toLowerCase() });

        res.status(200).json({ message: 'OTP sent to email. Please verify.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp, purpose } = req.body;
        if (!email || !otp || !purpose) return res.status(400).json({ message: 'All fields are required' });

        const validOtp = await Otp.findOne({ email: email.toLowerCase(), otp, purpose });
        if (!validOtp) return res.status(400).json({ message: 'Invalid or expired OTP' });

        if (purpose === 'verification') {
            await Profile.findOneAndUpdate({ email: email.toLowerCase() }, { isVerified: true });
        }
        
        await Otp.deleteOne({ _id: validOtp._id });
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

        const user = await Profile.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        if (!user.isVerified) return res.status(401).json({ message: 'Email not verified. Please sign up again to verify.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });

        // NextAuth will handle the JWT on the frontend, but we return user info + token
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                registrationNumber: user.registrationNumber
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });

        await checkEmailRateLimit(email);

        const user = await Profile.findOne({ email: email.toLowerCase(), isVerified: true });
        if (!user) return res.status(404).json({ message: 'Verified user with this email not found' });

        const otp = generateOTP();
        await Otp.deleteMany({ email: email.toLowerCase(), purpose: 'reset_password' });
        await Otp.create({ email: email.toLowerCase(), otp, purpose: 'reset_password' });

        await sendEmail({
            to: email,
            subject: 'NoteShaala - Password Reset',
            text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
            html: generateEmailTemplate(otp, 'reset_password')
        });

        // Log the request for rate limiting
        await OtpRequestLog.create({ email: email.toLowerCase() });

        res.status(200).json({ message: 'Password reset OTP sent to email' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) return res.status(400).json({ message: 'All fields are required' });

        const validOtp = await Otp.findOne({ email: email.toLowerCase(), otp, purpose: 'reset_password' });
        if (!validOtp) return res.status(400).json({ message: 'Invalid or expired OTP' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Profile.findOneAndUpdate({ email: email.toLowerCase() }, { password: hashedPassword });
        await Otp.deleteOne({ _id: validOtp._id });

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const resendOtp = async (req, res) => {
    try {
        const { email, purpose } = req.body;
        if (!email || !purpose) return res.status(400).json({ message: 'Email and purpose are required' });

        await checkEmailRateLimit(email);

        const otp = generateOTP();
        await Otp.deleteMany({ email: email.toLowerCase(), purpose });
        await Otp.create({ email: email.toLowerCase(), otp, purpose });

        const subject = purpose === 'verification' ? 'NoteShaala - Verify your email' : 'NoteShaala - Password Reset';
        
        await sendEmail({
            to: email,
            subject,
            text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
            html: generateEmailTemplate(otp, purpose)
        });

        // Log the request for rate limiting
        await OtpRequestLog.create({ email: email.toLowerCase() });

        res.status(200).json({ message: 'A new OTP has been sent to your email' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, verifyOtp, login, forgotPassword, resetPassword, resendOtp };
