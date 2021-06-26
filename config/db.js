const mongoose = require('mongoose')

const connectDB = () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("Database Connection Successful...");
    } catch (error) {
        console.error(error);
    }
}


module.exports = connectDB;