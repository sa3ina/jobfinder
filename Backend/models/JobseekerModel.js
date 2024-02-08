const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: String,
  firstname: String,
  lastname: String,
  email: String,
  education: String,
  desiredjob: Array,
  city: String,
  jobpreference: String,
  remote: Boolean,
  about: String,
  experience: String,
  password: String,
  cart: Object,
});

const Model = mongoose.model("jobseeker", schema);
module.exports = Model;
