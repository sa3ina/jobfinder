const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: String,
  email: String,
  title: String,
  categories: String,
  salary: String,
  location: String,
  remote: Boolean,
  type: String,
  experience: String,
  qualification: String,
  description: String,
  companyname: String,
  companywebsite: String,
  companyemail: String,
  companycontact: String,
  companylocation: String,
  companydescription: String,
  companylogo: String,
  benefits: Array,
  date: String,
});

const Model = mongoose.model("jobs", schema);
module.exports = Model;
