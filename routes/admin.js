const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const { formatDate } = require('../midleware/helper');
const Question = require('../moduls/Question');




router.get('/dashboard', isAdmin, async(req, res) => {
    try {

        const result = await Question.find({})
            .sort({ createdAt: 'desc' });
        const m = await Question.estimatedDocumentCount();

        // console.log(result)

        res.render('admin/dashboard', { result });
    } catch (error) {}
});

function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user && req.user.isAdmin) {
            next()
        } else {
            res.redirect('back');
        }
    } else {
        res.redirect('back');

    }
}

module.exports = router;