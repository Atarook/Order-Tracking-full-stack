const app=require('express')
const user=require('../models/user')
const CreateUser = async (req, res) => {
  try {
    const { name, password, email, phone } = req.body;
    const users = await user.findOne({ $or: [{ name }, { email }] });
    if (users) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const newUser = await user.create(req.body);
    res.status(201).json({ msg: "User created successfully", data: newUser });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ msg: errors });
    }
    res.status(400).json({ msg: "Error creating user", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (password.length < 6) {
    return res.status(400).json({ msg: "Password must be at least 6 characters long." });
    }
    const loggedinusers = await user.findOne({ $and: [{ password }, { email }] });
    if (!loggedinusers) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }
    return res.status(200).json({ loggedinusers });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ msg: errors });
    }
    res.status(400).json({ msg: "Error logging in", error: error.message });
  }
};


module.exports={CreateUser,loginUser}