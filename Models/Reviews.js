//Reviews.js

const mongoose = require('mongoose')

const ReviewsSchema = new mongoose.Schema({
    reviewID: String,
    customerID: String,
    itemID : String,
    rating: Number,
    comment: String,
    date : Date,
})

const ReviewsModel = mongoose.model("orders", ReviewsSchema)
module.exports = ReviewsModel