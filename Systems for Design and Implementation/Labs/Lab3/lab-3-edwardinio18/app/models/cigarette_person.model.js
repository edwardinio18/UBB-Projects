const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CigarettePersonSchema = new Schema({
    cigarette: Number,
    person: Number,
    createdAt: Date,
    updatedAt: Date
})

module.exports = mongoose.model("CigarettePerson", CigarettePersonSchema)