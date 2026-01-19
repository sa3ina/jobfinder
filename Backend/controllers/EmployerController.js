const Model = require("../models/EmployerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../middleware/auth");

const getall = async (req, res) => {
  try {
    const posts = await Model.find().select("-password");
    res.send(posts);
  } catch (err) {
    console.error("Error fetching employers:", err);
    // Fallback: try without select in case of schema issues
    try {
      const posts = await Model.find();
      const safePosts = posts.map(post => {
        const safePost = post.toObject();
        delete safePost.password;
        return safePost;
      });
      res.send(safePosts);
    } catch (fallbackErr) {
      res.status(500).json({ message: "Error fetching employers" });
    }
  }
};

const getbyId = async (req, res) => {
  const posts = await Model.findOne({ id: req.params.id }).select("-password");
  res.send(posts);
};

const deleteByiD = async (req, res) => {
  await Model.deleteOne({ id: req.params.id });
  res.send();
};

const postOne = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const post = await Model({ ...rest, password: hashedPassword });
    await post.save();
    const safePost = post.toObject();
    delete safePost.password;
    res.send(safePost);
  } catch (err) {
    res.status(500).json({ message: "Error creating employer" });
  }
};

const patchOne = async (req, res) => {
  let id = req.params.id;
  try {
    const { password, ...rest } = req.body;
    let updateFields = rest;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields = { ...rest, password: hashedPassword };
    }
    let updateUser = await Model.findOneAndUpdate({ id: id }, updateFields, {
      new: true,
    }).select("-password");
    res.send(updateUser);
  } catch (error) {
    res.status(500).send("Error updating user");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    let isMatch = false;
    // First try bcrypt compare (for newly created/updated users)
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (e) {
      isMatch = false;
    }
    // Fallback for old users that were saved with plain-text passwords
    if (!isMatch && user.password === password) {
      isMatch = true;
    }
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const payload = { id: user.id, role: "employer", email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
    const safeUser = user.toObject();
    delete safeUser.password;
    res.json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { getall, getbyId, deleteByiD, postOne, patchOne, login };
