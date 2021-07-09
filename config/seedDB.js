const Question = require('../moduls/Question')
const Answer = require('../moduls/Answer')


var data = [{
        title: 'Q1 Who is your Rubb? (the Lord,the Creator etc)',
        description: ''
    },
    {
        title: 'Q.2. What is your religion?',
        description: ''
    },
    {
        title: 'Q. 7. How do you worship Allah?',
        description: ''
    },
    {
        title: 'Q.3. How did you know Allah?',
        description: ''
    }
]

function seedDB() {
    Question.remove({}, (err, question) => {
        // if (err) {

        // } else {
        //     console.log('Question removed...')
        //     data.forEach((item) => {
        //         Question.create(item, (err, question) => {
        //             if (err) {

        //             } else {
        //                 Answer.create({
        //                     text: "A. My Rubb is Allah Who has created me and all that exists. He nourishes me and all creatures by His Bounties.",
        //                     author: "Qudus"
        //                 }, (err, comment) => 
        //                     question.answers.push(comment)
        //                     question.save()
        //                     console.log('comment save')
        //                 })
        //             }
        //         })
        //     })
        // }
    })
}


module.exports = seedDB;