const LocalStrategy = require('passport-local')
const passport = require('passport')
const User = require('../moduls/User')

const passortStrategy = () => {
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
}

module.exports = passortStrategy;