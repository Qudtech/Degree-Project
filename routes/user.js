const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const { formatDate, isLoggedIn } = require('../midleware/helper');
const Question = require('../moduls/Question');
const User = require('../moduls/User')




router.get('/dashboard', isLoggedIn, async(req, res) => {
    try {

        const result = await Question.find({})
            .sort({ createdAt: 'desc' });
        const m = await Question.estimatedDocumentCount();

        // console.log(result)

        res.render('user/dashboard', { result });
    } catch (error) {}
});



module.exports = router;