const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        select: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    branch: {
        type: String,
    },
    collegeYear: {
        type: String,
    },
    semester: {
        type: String,
    },
    registrationNumber: {
        type: String,
        uppercase: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
