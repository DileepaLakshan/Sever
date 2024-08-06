//DeliveryInfo.js

const mongoose = require('mongoose')

const DeliveryInfoSchema = new mongoose.Schema({
    deliveryID: String,
    deliveryType: String,
    trackingID : String,
    deliveryCost : Number,
    status : String,
    dateDelivered : Date,
})

const DeliveryInfoModel = mongoose.model("deliveryInfo", DeliveryInfoSchema)
module.exports = DeliveryInfoModel