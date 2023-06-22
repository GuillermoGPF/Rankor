const { Schema, model } = require('mongoose')

const reviewSchema = new Schema(
{
    title: {
        type: String,
    },
    description: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    rater: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ratee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }
},
{
    timestamps: true,
})

const Review = model('Review', reviewSchema)
Review.syncIndexes()
module.exports = Review