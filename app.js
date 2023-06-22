require('dotenv/config')
require('./db')

const express = require('express')
const hbs = require('hbs')
const app = express()

app.use(express.static('public'))
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

require('./config')(app)
require('./config/session.config')(app)

const projectName = 'Rankor'

app.locals.title = 'Rankor: The Gamers Ranking Social Network'

require('./routes')(app)

require('./error-handling')(app)

module.exports = app