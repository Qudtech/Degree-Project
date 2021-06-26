const express = require('express');
const passport = require('passport');
const User = require('../moduls/User')
const router = express.Router();
require('../config/passport')(passport)
const { formatDate, isLoggedIn } = require('../midleware/helper')



//@desc         show register page
// @router      GET /register
router.get('/register', (req, res) => {
    res.render('register')
});


//@desc         Register Logic
// @router      POST /register
router.post('/register', (req, res) => {
    if (req.body.isAdmin)
        console.log(req.body.isAdmin)
        // assign request to variable
    var newUser = new User({ username: req.body.username });
    var password = req.body.password;
    if (req.body.isAdmin === '14899') {
        newUser.isAdmin = true;
    }
    // register logic
    User.register(newUser, password, (err, user) => {
        if (err) {

            req.flash("error", err.message)
            return res.redirect('/register')
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/question')
            })

        }
    })
});


//@desc         show login page
// @router      GET /login
router.get('/login', (req, res) => {
    res.render('login')
});

//@desc         Login Logic 
// @router      POST /login
router.post('/login',
    passport.authenticate("local", {
        successRedirect: '/question',
        failureRedirect: '/login'
    }),
    function(req, res) {});


//@desc         logout Logic 
// @router      GET /logout
router.get('/logout', (req, res) => {
    req.logOut()
    req.flash("success", "Logged you out")
    res.redirect('/question');
});




module.exports = router;