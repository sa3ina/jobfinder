const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: String,
  fullname: String,
  rating: Number,
  comment: String,
});

const Model = mongoose.model("comments", schema);
module.exports = Model;
