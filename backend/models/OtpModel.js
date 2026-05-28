const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        enum: ['verification', 'reset_password'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // Automatically delete the document after 10 minutes
    }
});

const Otp = mongoose.models.Otp || mongoose.model('Otp', OtpSchema);

module.exports = Otp;
