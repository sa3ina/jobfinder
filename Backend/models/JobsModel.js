const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: String,
  title: String,
  categories: String,
  company: String,
  salary: String,
  location: String,
  remote: Boolean,
  type: String,
  remote: Boolean,
  experience: String,
  qualification: String,
  description: String,
  companyname: String,
  companywebsite: String,
  companyemail: String,
  companycontact: String,
  companylocation: String,
  companydescription: String,
});

const Model = mongoose.model("jobs", schema);
module.exports = Model;
