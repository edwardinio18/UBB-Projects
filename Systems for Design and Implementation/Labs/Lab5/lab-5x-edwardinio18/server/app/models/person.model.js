const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  id: { type: Number, unique: true },
  name: String,
  age: Number,
  email: String,
  phone: String,
  address: String,
});

PersonSchema.index({ id: 1 });

module.exports = mongoose.model("Person", PersonSchema);
