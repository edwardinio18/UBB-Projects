const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    id: {type: Number, unique: true},
    name: {type: String, unique: true},
    origin: String,
    description: String,
    noCountries: Number,
    photo: String
})

module.exports = mongoose.model("Brand", BrandSchema)