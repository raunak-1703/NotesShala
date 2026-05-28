const mongoose = require('mongoose');

const OtpRequestLogSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // Expire after 1 hour (3600 seconds)
    }
});

const OtpRequestLog = mongoose.models.OtpRequestLog || mongoose.model('OtpRequestLog', OtpRequestLogSchema);

module.exports = OtpRequestLog;
