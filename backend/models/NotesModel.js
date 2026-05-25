const mongoose = require('mongoose')

const schema = mongoose.Schema;

const NotesSchema = new schema({
    postedBy:{
        type: String,
        required: true
    },
    branch:{
        type: String,
    },
    semester: {
        type: String
    },
    subject:{
        type: String
    },
    file:{
        type: String,
    },
    driveFileId:{
        type: String,
    },
    fileName:{
        type: String,
    },
    mimeType:{
        type: String,
    },
},{
    timestamps: true,
})

const notes = mongoose.model('notes', NotesSchema)

module.exports = notes;
