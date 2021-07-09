const mongoose = require('mongoose');


const questionSchema = mongoose.Schema({
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Question', questionSchema)