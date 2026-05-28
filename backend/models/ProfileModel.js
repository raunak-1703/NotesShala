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
    branch: {
        type: String,
    },
    collegeYear: {
        type: String,
    },
    semester: {
        type: String,
    },
}, {
    timestamps: true,
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
