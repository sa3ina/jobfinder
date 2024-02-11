const Model = require("../models/EmployerModel");
const getall = async (req, res) => {
  const posts = await Model.find();
  res.send(posts);
};
const getbyId = async (req, res) => {
  const posts = await Model.findOne({ id: req.params.id });
  res.send(posts);
};
const deleteByiD = async (req, res) => {
  await Model.deleteOne({ id: req.params.id });
  res.send();
};
const postOne = async (req, res) => {
  const post = await Model(req.body);
  await post.save();
  res.send(post);
};
const patchOne = async (req, res) => {
  let id = req.params.id;
  try {
    let updateUser = await Model.findOneAndUpdate({ id: id }, req.body, {
      new: true,
    });
    res.send(updateUser);
  } catch (error) {
    res.status(500).send("Error updating user");
  }
};

module.exports = { getall, getbyId, deleteByiD, postOne, patchOne };
