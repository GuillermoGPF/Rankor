const { Schema, model } = require('mongoose')

const messageSchema = new Schema(
{
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    text: String,
    date: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true,
})

const Message = model('Message', messageSchema)

module.exports = Message