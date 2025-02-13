const mongoose = require('mongoose');
require('dotenv').config();

// Use the container name 'mongodb' instead of localhost
const mongoURI = process.env.MONGO_URI;

const connectDB = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
}

// Call connectDB function to establish the connection
connectDB();

module.exports = connectDB;
