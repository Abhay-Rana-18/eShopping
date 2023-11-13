
const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1';

const connectToMongo = async() => {
    await mongoose.connect(mongoURI);
    console.log("Connected to mongoDB successfully!");
}

module.exports = connectToMongo;
