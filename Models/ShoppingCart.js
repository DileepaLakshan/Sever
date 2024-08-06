//ShoppingCart.js

const mongoose = require('mongoose')

const ShoppingCartSchema = new mongoose.Schema({
    cartID: String,
    itemID: String,
    quantity : Number,
    dateAdded: Date,   
})

const ShoppingCartModel = mongoose.model("shoppingCarts", ShoppingCartSchema)
module.exports = ShoppingCartModel