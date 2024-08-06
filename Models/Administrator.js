//Administrator.js

const mongoose = require('mongoose')

const AdministratorSchema = new mongoose.Schema({
    administratorID:String,
    adminName: String,
    email: String,
   
})

const AdministratorModel = mongoose.model("administrators", AdministratorSchema)
module.exports = AdministratorModel