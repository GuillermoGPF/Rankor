const { Schema, model } = require('mongoose')

const gameSchema = new Schema(
{
    name: {
        type: String,
        minLength: [10, 'La descripción debe contener 10 carácteres como mínimo']
    },
    description: String,
    genre: String,
    publisher: String,
    screenshot: String,
},
{
    timestamps: true,
})

const Game = model('Game', gameSchema)

module.exports = Game