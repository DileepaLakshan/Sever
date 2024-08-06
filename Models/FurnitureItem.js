//FurnitureItem.js

const mongoose = require('mongoose')

const FurnitureItemSchema = new mongoose.Schema({
    itemID: String,
    name: String,
    description : String,
    categoryID: String,
    material: String,
    dimensions : Number,
    weight : Number,
    color: String,
    price: Number,
    stock_quantity : Number,
    Image_URL : String,
})

const FurnitureItemModel = mongoose.model("furnitureItems", FurnitureItemSchema)
module.exports = FurnitureItemModel