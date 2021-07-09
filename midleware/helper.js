const express = require('express');
const Answer = require('../moduls/Answer');
const router = express.Router();
const moment = require('moment')
const Question = require('../moduls/Question')

module.exports = {
    formatDate: function(date, format) {
        return moment(date).format(format)
    },
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        } else {
            req.flash("success", "Please login First")
            res.redirect('/login')
        }
    },
    checkAnswerOwnership: function(req, res, next) {
        if (req.isAuthenticated()) {
            Answer.findById(req.params.answer_id, (err, foundAnswer) => {
                if (err) {

                } else {
                    if (foundAnswer.author.id.equals(req.user._id)) {
                        return next()
                    } else {
                        res.redirect('back')
                    }
                }
            })
        } else {
            req.flash("error", "Please login!, Only login user can do this")
            res.redirect('back')
        }
    },

    checkQestionOwnership: function(req, res, next) {
        if (req.isAuthenticated()) {
            Question.findById(req.params.id, (err, foundQuestion) => {
                if (err) {
                    console.log(err)
                } else {
                    if (foundQuestion.author.id.equals(req.user._id)) {
                        return next()
                    } else {
                        req.flash("error", "Please login!, Only login user can do this")
                        res.redirect('back')
                    }
                }
            })
        } else {
            req.flash("error", "Please login!, Only login user can do this")
            res.redirect('back')
        }
    },
    paginationResult: function(model) {
        return async(req, res, next) => {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const results = {}

            if (startIndex > 0) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            if (endIndex < await model.countDocuments().exec()) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
            try {
                results.results = await model.find({}).limit(limit).skip(startIndex).exec()
                res.paginationResult = results
                next()
            } catch (e) {
                res.status(500).json({ message: e.message })
            }
        }
    },
    truncate: function(str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + ''
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        }
        return str
    },

    stripTags: function(input) {
        return input.replace(/<(?:.|\n)*>/gm, '')
    },


}