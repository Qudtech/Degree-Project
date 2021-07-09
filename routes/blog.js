const express = require('express')
const router = express.Router();
const { formatDate, isLoggedIn } = require('../midleware/helper')
const Post = require("../moduls/Post");
const Comment = require("../moduls/Comment");
const { post } = require('./question');
const Answer = require('../moduls/Answer');


// Post.create({
//     title: "Post 3",
//     body: "Post one Body 1"
// }, (err, result) => {
//     if (err) {
//         console.log("err")
//     } else {
//         Post.find({}, (err, result) => {
//             console.log(result);
//         })
//     }
// })


router.post('/', async(req, res) => {
    var blog = req.body.blog;
    await Post.create(blog, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/blog/new')
    })
    console.log(blog)
})
router.get('/', async(req, res) => {
    var Result = await Post.find({})
        .sort({ createAt: 'desc' })
        .lean()
        .limit(3)
    console.log(Result)
    res.render('Blog/index', { Result });
});

router.get('/nacomyo', async(req, res) => {
    var Result = await Post.find({ "status": "NACOMYO" })
        .sort({ createAt: 'desc' })
        .lean()
        .limit(3)
    console.log(Result)
    res.render('Blog/nacomyo', { Result });
});


router.get('/education', async(req, res) => {
    var Result = await Post.find({ "status": "EDUCATION" })
        .sort({ createAt: 'desc' })
        .lean()
        .limit(5)
    console.log(Result)
    res.render('Blog/education', { Result });
});

router.get('/fatwah', async(req, res) => {
    var Result = await Post.find({ "status": "FATWAH" })
        .sort({ createAt: 'desc' })
        .lean()
        .limit(5)
    console.log(Result)
    res.render('Blog/fatwah', { Result });
});

router.get('/alyekeen', async(req, res) => {
    var Result = await Post.find({ "status": "AL-YEKEEN" })
        .sort({ createAt: 'desc' })
        .lean()
        .limit(5)
    console.log(Result);
    res.render('Blog/alyekeen', { Result });
});


router.get('/new', async(req, res) => {

    res.render('Blog/new');
});


router.get('/:id', async(req, res) => {
    var Result = await Post.findById(req.params.id)
        .populate('comments')
    console.log(req.user)
    console.log(Result)
    res.render("blog/show", {
        post: Result
    });
});

router.post('/:id/comment', isLoggedIn, async(req, res) => {
    await Post.findById(req.params.id, (err, postId) => {
        if (err) {
            console.log(err)
        } else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err)
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    console.log(comment);
                    comment.save();
                    postId.comments.push(comment);
                    postId.save();
                    res.redirect(`/blog/${req.params.id}`)
                }
            })
        }

    })

});


module.exports = router;