const express = require('express'); // Express is imported as express, not app.
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure you have the User model imported

// The authenticateToken function is not used in this file, so it should be removed.

const CreateOrder = async (req, res) => {
  try {
  // Set the courieruserId to a default value or fetch it from the request body
  const { courieruserId } = req.body;
    //console.log(req);
    
    const {userId} = req.user; 
    console.log("userId",userId);
    // Ensure the userId is the logged-in user
    const user = await User.findOne({ userId });
    console.log("adadsadw");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const {  pickupLocation, dropoffLocation, packageDetails, deliveryTime } = req.body;
    const {_id} = user;
    console.log("adadsadw");
    // Create the new order with the userId from the authenticated user
    const defaultcourieruserId = null; // Replace with your actual default ID

    const newOrder = await Order.create({ 
      userId, pickupLocation, dropoffLocation, packageDetails, deliveryTime
      ,
    });
    
    res.status(201).json({ msg: "Order created successfully", data: newOrder });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ msg: errors });
    }
    res.status(400).json({ msg: "Error creating order", error: error.message });
  }
};
const GetUserOrders = async (req, res) => {
  try {
    const {userId} = req.user; 
    console.log("userId",userId);
    // Ensure the userId is the logged-in user
    // const user = await User.findOne({ userId });
    // console.log("adadsadw");

    // if (!user) {
    //   return res.status(404).json({ msg: "User not found" });
    // }

    const orders = await Order.find({userId});
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(400).json({ msg: "Error fetching orders", error: error.message });
  }
};

const getOrderBYid = async (req, res) => {
  try {
<<<<<<< Updated upstream
    const { id } = req.body;
=======
    const { id } = req.params;
   
>>>>>>> Stashed changes
    const {userId} = req.user; 
    const orders = await Order.find({userId});

    const order = await orders.find(order => order._id == id);

    const courierId = order.courieruserId;
<<<<<<< Updated upstream
=======
    if (!courierId) {
      return res.status(200).json({ data: order });
    }
>>>>>>> Stashed changes
    const courier = await User.findOne({userId:courierId});
    const { name, email, phone } = courier;
    console.log(courier);
    
    res.status(200).json({ data: order, courier: { name, email, phone } });


} catch (error) {
    res.status(400).json({ msg: "Error fetching orders", error: error.message });
  }
};
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
const CancelOrder = async (req, res) => {
  try {
    const { id } = req.body;
    const {userId} = req.user; 

    const orders = await Order.find({userId});
    const order = await orders.find(order => order._id == id);
    
    if (order.status === 'pending') {
      order.status = 'canceled';
      await order.save();
      res.status(200).json({ msg: "Order canceled successfully", data: order });
    } else {
      res.status(400).json({ msg: "Order cannot be canceled", data: order });
    }
  }

catch (error) {
    res.status(400).json({ msg: "Error fetching orders", error: error.message });
  }
}
module.exports = { CreateOrder, GetUserOrders ,getOrderBYid ,CancelOrder};