const express = require('express');
const router = express.Router({ mergeParams: true });
const Question = require('../moduls/Question')
const { formatDate, stripTags, checkAnswerOwnership, checkQestionOwnership, isLoggedIn } = require('../midleware/helper')
const Answer = require('../moduls/Answer');


//@desc         show all question 
// @router      GET /QUESTION
router.get('/', async(req, res) => {
    // var numberQestion = await Question.estimatedDocumentCount({}, (err, item) => { return item });
    const questionTotal = await Question.estimatedDocumentCount();
    const answerTotal = await Answer.estimatedDocumentCount();

    Question.find({}, async(err, allquestion) => {
        try {
            res.render('Question/index', { Questions: allquestion, questionTotal: questionTotal, answerTotal: answerTotal });
        } catch (error) {}
    })
});


//@desc         show all unanswer question 
// @router      GET / unanswer QUESTION
router.get('/unanswers', async(req, res) => {
    // var numberQestion = await Question.estimatedDocumentCount({}, (err, item) => { return item });
    const questionTotal = await Question.estimatedDocumentCount();
    const answerTotal = await Answer.estimatedDocumentCount();

    Question.find({}, async(err, allquestion) => {
        try {
            res.render('Question/unanswered', { Questions: allquestion, questionTotal: questionTotal, answerTotal: answerTotal });
        } catch (error) {}
    })
});


//@desc         display poat question 
// @router      GET /QUESTION
router.get('/new', (req, res) => {
    res.render('Question/new');
});



//@desc         ADD QUESTION TO DATABASE
// @router      POST /QUESTION
router.post('/', isLoggedIn, (req, res) => {
    // console.log(req.body)
    var description = req.body.description;
    // console.log(req.user)
    var author = {
        id: req.user.id,
        username: req.user.username
    }
    newQuestion = { description: description, author: author };
    // console.log(newQuestion)
    Question.create(newQuestion, (err, question) => {
        if (err) {
            // res.render('404');
        } else {
            // console.log(question)
            question.save()
            res.redirect('/question')
        }
    })
});


//@desc         show page
// @router      GET /question/:id
router.get('/:id', (req, res) => {
    Question.findById(req.params.id).populate('answers').exec((err, findQuestion) => {
        // console.log(findQuestion)
        try {
            req.flash("error", "Please login first")
            res.render('Question/show', { question: findQuestion })
        } catch (error) {

        }
    })
});



//@desc         show edit page
// @router      GET /question/:id/edit
router.get('/:id/edit', checkQestionOwnership, (req, res) => {
    Question.findById(req.params.id, (err, QuestionId) => {
        if (err) {
            //error
        } else {
            res.render('Question/edit', { question: QuestionId });
        }
    })
});

//@desc         Edit Question
// @router      PUT /question/:id
router.post('/:id', checkQestionOwnership, (req, res) => {
    Question.findByIdAndUpdate(req.params.id, req.body.question, (err, Update) => {
        if (err) {
            //error
        } else {
            res.redirect('/question/' + req.params.id);
        }
    })
});

//@desc         Edit Question
// @router      PUT /question/:id
router.delete('/:id', checkQestionOwnership, (req, res) => {
    Question.findOneAndRemove(req.params.id, (err) => {
        if (err) {
            //error
            res.redirect('/question');
        } else {
            res.redirect('/question');
        }
    })
});




module.exports = router;