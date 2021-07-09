const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    status: {
        type: String,
        trim: true
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],

    createAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model("posts", PostSchema);