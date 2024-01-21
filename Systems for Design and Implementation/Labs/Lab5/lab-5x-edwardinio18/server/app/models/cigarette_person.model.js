const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CigarettePersonSchema = new Schema({
  cigarette: Number,
  person: Number,
  createdAt: Date,
  updatedAt: Date,
});

CigarettePersonSchema.index({ cigarette: 1, person: 1 });
CigarettePersonSchema.index({ cigarette: 1 });
CigarettePersonSchema.index({ person: 1 });

module.exports = mongoose.model("CigarettePerson", CigarettePersonSchema);
