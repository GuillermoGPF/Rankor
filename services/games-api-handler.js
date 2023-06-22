const axios = require('axios')

const API_KEY = process.env.API_KEY

class APIHandler {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://api.rawg.io/api'
        })
    }

    getOneQuery(query) {
        return this.axiosApp.get(`/games?key=${API_KEY}&search=${query}`)
    }

    getOneGame(id) {
        return this.axiosApp.get(`/games/${id}?key=${API_KEY}`)
    }

    getbyGenre(id) {
        return this.axiosApp.get(`/games?key=${API_KEY}&genres=${id}`)
    }
}

module.exports = APIHandler