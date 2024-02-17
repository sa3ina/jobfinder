const mongoose = require("mongoose");

const schema = mongoose.Schema({
  useremail: String,
  profilePicture: Object,
});

const Model = mongoose.model("photos", schema);
module.exports = Model;
