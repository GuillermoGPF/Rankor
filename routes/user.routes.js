const router = require('express').Router()
const User = require('../models/User.model')
const fileUploader = require('../config/cloudinary.config')

const APIHandler = require('../services/games-api-handler')
const apiHandler = new APIHandler()


const { isAdmin, isUser } = require('../utils')
const { isLoggedIn, checkRoles, isUserOrAdmin } = require('../middlewares')
const cloudinaryConfig = require('../config/cloudinary.config')
const Review = require('../models/Review.model')

router.get('/user', isLoggedIn, (req, res, next) => {
    User
        .find()
        .then(user => res.render('users/user-details', { user }))
        .catch(err => console.log(err))
})

router.get('/user/create', (req, res, next) => res.render('layout'))

router.post('/user/create', (req, res, next) => {
    const { username, password, name, description, avatar, skills, role, playedGames, friends } = req.body

    User
        .create({ username, password, name, description, avatar, skills, role, playedGames, friends })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

router.get('/user/:id', (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('users/user-details', user))
        .catch(err => console.log(err))
        // .findById(id)
        // .then(user => {
        //     const promises = []

        //     user.playedGames.forEach(el => {
        //         promises.push(apiHandler.getOneGame(el))
        //     })

        //     Promise.all(promises)
        //         .then(responses => {
        //             responses.forEach((response, i) => {
        //                 user.playedGames[i] = response.data.name
        //             })

        //             res.render('users/user-details', user)
        //         })
        //         .catch(err => console.log(err))

        // })
        // .catch(err => console.log(err))
})

router.get('/user/:id/edit', isLoggedIn, checkRoles('USER', 'ADMIN'), isUserOrAdmin, (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('users/user-edit', user))
        .catch(err => console.log(err))
})

router.post('/user/:id/edit', isLoggedIn, checkRoles('USER', 'ADMIN'), isUserOrAdmin, fileUploader.single('avatar'), (req, res, next) => {
    const { id } = req.params
    const { username, password, name, description, avatar, skills, role, playedGames, friends } = req.body

    User
        .findByIdAndUpdate(id, { username, password, name, description, avatar: req.file.path, skills, role, playedGames, friends }, { new: true })
        .then(() => res.redirect(`/user/${id}`))
        .catch(err => console.log(err))
})

router.post('/user/:id/delete', isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

router.get('/user/add-game/:id', isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {
    const currentUserId = req.session.currentUser._id
    const { id } = req.params

    User
        .findByIdAndUpdate(currentUserId, { $push: { playedGames: id } }, { new: true })
        .then(() => res.redirect(`/user/${id}`))
        .catch((err) => console.log(err))
})

router.get('/user/add-game/:id/delete', isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {
    const currentUserId = req.session.currentUser._id
    const { id } = req.params

    User
        .findByIdAndUpdate(id, {$pull: {playedGames:currentUserId}}, {new: true})
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))
})

router.post('/user/add-rating', isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {
    const { ratee, rating } = req.body

    if (!req.session.currentUser)
        res.status(401).json('Debe iniciar sesión')
    Review
          .create({ rater: req.session.currentUser, ratee, rating })
          .then(() => res.status(200).json())
          .catch(err => res.status(500).json(err))
})

module.exports = router