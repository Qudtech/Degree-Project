const express = require('express')
const router = express.Router();
const { formatDate } = require('../midleware/helper')



router.get('/blog', (req, res) => {
    res.render('Blog/index');
});
module.exports = router;