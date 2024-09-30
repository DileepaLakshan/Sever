//OrderList.js

const mongoose = require('mongoose')

const OrderListSchema = new mongoose.Schema({
    orderID: String,
    itemID: String,
    quantity : Number,
    subTotal : Number,
})

const OrderListModel = mongoose.model("OrderList", OrderListSchema)
module.exports = OrderListModel