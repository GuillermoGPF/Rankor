const router = require('express').Router()
const Review = require('../models/Review.model')
const User = require('../models/User.model')
const Game = require('../models/Game.model')

const { isAdmin, isUser } = require('../utils')
const { isLoggedIn, checkRoles, isUserOrAdmin } = require('../middlewares')

router.get('/review', isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res) => {
    const currentUser = req.session.currentUser
    Review
          .find()
          .populate('game')
          .populate('rater')
          .then((reviews) => {
                res.render('reviews/review', {
                    reviews, isUserOrAdmin: currentUser.role === 'ADMIN' || currentUser?._id === reviews.user?._id
                })
          })
          .catch((err) => console.log(err))
})

router.get('/review/create', isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => res.render('/review'))

router.post('/review/create', isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {
    const { title, description, rating, rater, ratee, game } = req.body
    Review
          .create({ title, description, rating, rater, ratee, game })
          .then(() => res.redirect('/review'))
          .catch(err => console.log(err))
})

router.post('/review-delete/:id', isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res) => {
    const { id } = req.params

    Review
          .findById(id)
          .populate('rater')
          .then(review => {
                if (review.rater.username === req.session.currentUser.username ||
                    req.session.currentUser.role === 'ADMIN') {
                    Review
                        .findByIdAndRemove(id)
                        .then(() => res.render('reviews/review'))
                        .catch((err) => console.log(err))
                } else {
                    res.render('reviews/review')
                }
          })
          .catch((err) => console.log(err))
})

module.exports = router