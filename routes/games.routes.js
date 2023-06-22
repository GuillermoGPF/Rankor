const express = require('express')
const router = express.Router()
const APIHandler = require('../services/games-api-handler')
const gamesAPI = new APIHandler()


//Search
router.get('/search', (req, res) => {
    const { query } = req.body

    gamesAPI
            .getOneQuery(query)
            .then(game => {
                res.render('search/search', { game: game.data.results })
            })
            .catch((err) => console.log(err))
})

//Details
router.get('/search/:id', (req, res) => {
    const { id } = req.params

    gamesAPI
            .getOneGame(id)
            .then(game => {
                res.render('search/search-details', game.data)
            })
            .catch((err) => console.log(err))
})

//Genre Details
router.get('/search/genre/:id', (req, res) => {
    const { id } = req.params

    gamesAPI
            .getbyGenre(id)
            .then(game => {
                res.render('search/search', { game: game.data.results })
            })
            .catch((err) => console.log(err))
})

module.exports = router