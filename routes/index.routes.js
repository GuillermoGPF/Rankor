const router = require('express').Router()
const User = require('../models/User.model')
const APIHandler = require('../services/games-api-handler')
const apiHandler = new APIHandler()

// router.get('/', (req, res, next) => {
//     User
//         .find()
//         .then(users => {

//             const responses = users.map(user => {
//                 const promises = []

//                 user.playedGames.forEach((el) => {
//                     promises.push(apiHandler.getOneGame(el))
//                 })

//                 // Promise.all(promises)
//                 //         .then(responses => {
//                 //             responses.forEach((response, i) => {
//                 //                 user.playedGames[i] = response.data.name
//                 //                 console.log(user.playedGames[i])
//                 //             })
//                 //             res.render('index', { users })
//                 //         })
//                 //         .catch(err => console.log(err))
//             })

//         })
//         .catch(err => console.log(err))
// })

router.get('/', (req, res, next) => {
    User
        .find()
        .then(user => res.render('index', { user }))
        .catch(err => console.log(err))
})

module.exports = router