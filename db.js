const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// Define the mongoDB connection URL
// const mongoURL = process.env.MONGO_URL_LOCAL || 'mongodb://0.0.0.0:27017/db'  // Replace 'db' with your database name, local
const mongoURL = process.env.MONGO_URL

// Set up MogoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for databse connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDb connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;
