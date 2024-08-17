//User.js

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: String,
    userName: {
        type: String,
        unique: true,
    },
    userEmail: {
        type: String,
        unique: true,
    },
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