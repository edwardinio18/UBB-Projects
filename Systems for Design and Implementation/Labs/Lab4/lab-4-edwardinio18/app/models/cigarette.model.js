const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CigaretteSchema = new Schema({
    id: {type: Number, unique: true},
    name: {type: String, unique: true},
    price: Number,
    origin: String,
    photo: String,
    description: String,
    brand: Number
})

module.exports = mongoose.model("Cigarette", CigaretteSchema)