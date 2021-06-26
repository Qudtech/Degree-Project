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