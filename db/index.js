const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGODB_REMOTE || process.env.MONGODB_URI || 'mongodb://localhost/rankor'

mongoose
        .connect(MONGO_URI)
        .then((x) => console.log(`Connected to Mongo! Database name: '${x.connections[0].name}'`))
        .catch((err) => console.log('Error connecting to mongo: ', err))