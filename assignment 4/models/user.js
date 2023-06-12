const mongoose = require("mongoose");

let modelSchema = mongoose.Schema({
  name:String,
  email: { type: String, unique: true },
  password: String,
  role: [],
});

module.exports = mongoose.model("User", modelSchema);

