const express = require('express')
const router = express.Router();
const { formatDate } = require('../midleware/helper')


router.get('/', (req, res) => {
    res.render('landing');
});


router.get('/landing', (req, res) => {
    res.render('landing2');
});
module.exports = router;