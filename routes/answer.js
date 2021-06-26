const express = require('express');
const Answer = require('../moduls/Answer');
const router = express.Router({ mergeParams: true });
const Question = require('../moduls/Question')
const { formatDate, isLoggedIn, checkAnswerOwnership } = require('../midleware/helper')





//@desc         show answer page and get by id 
// @router      GET /answer/id/answer/new
router.get('/new', isLoggedIn, async(req, res) => {
    // console.log(req.user)
    Question.findById(req.params.id, (err, QuestionId) => {
        if (err) {
            console.log(err)
        } else {
            res.render('Answer/new', { question: QuestionId });
        }
    })
});


//@desc         Answer Question by geting id  
// @router      POST /answer/id/answer
router.post('/', isLoggedIn, (req, res) => {

    Question.findById(req.params.id, (err, question) => {
        if (err) {
            console.log(err)
        } else {
            console.log(req.body.answer);
            Answer.create(req.body.answer, (err, answer) => {
                // add username and id 
                answer.author.id = req.user._id
                answer.author.username = req.user.username
                    // save 
                console.log(answer)
                answer.save()
                    // console.log(req.user.username)
                question.answers.push(answer);
                question.save();
                res.redirect('/question/' + question._id);
            })
        }
    })
});



//@desc         show edit answer page and get by id 
// @router      GET /answer/:id
router.get('/:answer_id/edit', checkAnswerOwnership, (req, res) => {
    Answer.findById(req.params.answer_id, (err, foundAnswer) => {
        if (err) {

        } else {
            // console.log(item)
            res.render('Answer/edit', { question: req.params.id, answer: foundAnswer })
        }
    })
});
//@desc         Edit  Answer logic  
// @router      GET /answer/:id

router.post('/:answer_id', checkAnswerOwnership, (req, res) => {
    Answer.findByIdAndUpdate(req.params.answer_id, req.body.answer, (err, update) => {
        if (err) {
            res.send('back')
        } else {
            res.redirect(`/question/${req.params.id}`)
        }
    })
});

//@desc         Edit  Answer logic  
// @router      GET /answer/:id
router.delete('/:answer_id', checkAnswerOwnership, (req, res) => {
    Answer.findOneAndRemove(req.params.answer_id, (err) => {
        if (err) {
            res.redirect('back')
        } else {
            res.redirect(`/question/${req.params.id}`)
        }
    })
});





module.exports = router;