const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CigaretteSchema = new Schema({
  id: { type: Number, unique: true },
  name: { type: String, unique: true },
  price: Number,
  origin: String,
  photo: String,
  description: String,
  brand: Number,
});

CigaretteSchema.index({ id: 1, brand: 1 });
CigaretteSchema.index({ id: 1 });
CigaretteSchema.index({ brand: 1 });
CigaretteSchema.index({ price: 1 });

module.exports = mongoose.model("Cigarette", CigaretteSchema);
