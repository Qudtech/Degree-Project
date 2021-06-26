const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dotenv = require('dotenv')
const flash = require('connect-flash')
const moment = require('moment')
const connectDB = require('./config/db')
const morgan = require('morgan')
const seedDB = require('./config/seedDB')
const passport = require('passport')
const methodOverride = require('method-override')
    // const {} = require('./midleware/founctions')





dotenv.config({ path: './config/config.env' })
connectDB();
// seedDB();
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
};


// =============================
// PASSPORT CONFIGUREATION
// =============================
app.use(require('express-session')({
    secret: "i Thank God",
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.moment = req.moment;
    next();
})

// =====================
// ROUNTER
// ========================
app.use('/', require('./routes/index'))
app.use('/question', require('./routes/question'))
app.use('/question/:id/answer', require('./routes/answer'))
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/admin'))
app.use('/', require('./routes/blog'))


const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`App listening on port ${PORT}...!`))