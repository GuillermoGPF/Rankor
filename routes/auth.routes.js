const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const saltRounds = 10


// Signup
router.get('/signup', (req, res, next) => res.render('layout'))

router.post('/signup', (req, res, next) => {
    const { password } = req.body

    bcrypt
          .genSalt(saltRounds)
          .then(salt => bcrypt.hash(password, salt))
          .then(password => User.create({ ...req.body, password: password }))
          .then(createdUser => res.redirect('/'))
          .catch(error => next(error))
})

// Login
router.get('/login', (req, res, next) => res.render('layout'))

router.post('/login', (req, res, next) => {
    const { username, password } = req.body

    User
        .findOne({ username })
        .then(user => {
            if (!user) {
                res.render('layout', { errorMessage: 'Username no registrado en la Base de Datos' })
                return
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render('layout', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user
                req.app.locals.connect = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})

// Logout
router.post('/logout', (req, res, next) => {
    req.app.locals.connect = null
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router