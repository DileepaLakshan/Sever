//Category.js

const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    categoryID: String,
    categoryName: String,
    description : String,

})

const CategoryModel = mongoose.model("categories", CategorySchema)
module.exports = CategoryModel