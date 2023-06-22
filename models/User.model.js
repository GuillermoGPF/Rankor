const { Schema, model } = require('mongoose')

const userSchema = new Schema(
{
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: String,
    description: String,
    avatar: String,
    skills: String,
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
    playedGames: [{
        type: String,
        unique: true,
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    timestamps: true,
})

const User = model('User', userSchema)

User.syncIndexes()

module.exports = User