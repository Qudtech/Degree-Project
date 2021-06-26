const mongoose = require('mongoose');


const answerSchema = mongoose.Schema({
    text: {
        type: String
            // required: true
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: {
            type: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Answer', answerSchema)