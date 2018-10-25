const mongoose = require('mongoose')
const Schema= mongoose.Schema

const UserSchema= new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10,
        minlength: 1
    },
    password: String
})

module.exports= mongoose.model('user',UserSchema)