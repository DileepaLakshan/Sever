//Orders.js

const mongoose = require('mongoose')

const OrdersSchema = new mongoose.Schema({
    orderID: String,
    dateCreated: Date,
    customerID: String,
    deliveryID: String,
    totalCost: Number,
      
})

const OrderModel = mongoose.model("orders", OrdersSchema)
module.exports = OrderModel