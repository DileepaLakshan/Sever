//User.js

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    password: String,
    loginStatus: Boolean,
    AdminStatus: {
        type: Boolean,
        default: false
    },
    registerDate: Date,

    
    
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel