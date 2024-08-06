//OrderDetails.js

const mongoose = require('mongoose')

const OrderDetailsSchema = new mongoose.Schema({
    orderID: String,
    itemID: String,
    quantity : Number,
    subTotal : Number,
})

const OrderDetailsModel = mongoose.model("orderDetails", OrderDetailsSchema)
module.exports = OrderDetailsModel