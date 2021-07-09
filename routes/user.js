const { json } = require('body-parser');
const { render } = require('ejs');
const express = require('express')
const router = express.Router();
const { formatDate, isLoggedIn } = require('../midleware/helper');
const Question = require('../moduls/Question');
const User = require('../moduls/User')




router.get('/dashboard', isLoggedIn, async(req, res) => {
    try {


        // console.log(result)

        res.render('user/dashboard');
    } catch (error) {}
});

router.get('/myquestion', isLoggedIn, (req, res) => {

    var author = { 'author.id': req.user.id };
    const Qestions = Question.find(author).lean();
    console.log(Qestions)

    res.render('user/myquestion', {
        name: req.user.username,
        Qestions
    })
})

module.exports = router;