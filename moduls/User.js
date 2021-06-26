const mongoose = require('mongoose');
const passportLocalStrategy = require('passport-local-mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})
userSchema.plugin(passportLocalStrategy);

module.exports = mongoose.model("User", userSchema);