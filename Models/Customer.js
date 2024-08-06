//Customer.js

const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    customerID:String,
    customerName:String,
    address: String,
    email: String,
    creditCardInfo: String,
    deliveryInfo: String,
    accountBalance: Number,

   
})

const CustomerModel = mongoose.model("customers", CustomerSchema)
module.exports = CustomerModel