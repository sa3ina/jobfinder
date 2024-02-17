const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

const Model = mongoose.model("admins", schema);
module.exports = Model;
