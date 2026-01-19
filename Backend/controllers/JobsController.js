const Model = require("../models/JobsModel");
const getall = async (req, res) => {
  try {
    const posts = await Model.find();
    res.send(posts);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Error fetching jobs" });
  }
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
const patchById = async (req, res) => {
  try {
    const updatedData = req.body;
    const postId = req.params.id;
    const post = await Model.findOne({ id: postId });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    Object.assign(post, updatedData);
    await post.save();
    res.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { getall, getbyId, deleteByiD, postOne, patchById };
