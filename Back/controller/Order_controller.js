const express = require('express'); // Express is imported as express, not app.
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure you have the User model imported

// The authenticateToken function is not used in this file, so it should be removed.

const CreateOrder = async (req, res) => {
  try {
  
    //console.log(req);
    
    const {userId} = req.user; 
    console.log("userId",userId);
    // Ensure the userId is the logged-in user
    const user = await User.findOne({ userId });
    console.log("adadsadw");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const { courieruserId, pickupLocation, dropoffLocation, packageDetails, deliveryTime } = req.body;
    const {_id} = user;
    console.log("adadsadw");
    // Create the new order with the userId from the authenticated user
    const newOrder = await Order.create({ userId, courieruserId, pickupLocation, dropoffLocation, packageDetails, deliveryTime });
    
    res.status(201).json({ msg: "Order created successfully", data: newOrder });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ msg: errors });
    }
    res.status(400).json({ msg: "Error creating order", error: error.message });
  }
};


module.exports = { CreateOrder };