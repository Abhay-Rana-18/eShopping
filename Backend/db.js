console.log("start");
const mongoose = require('mongoose');
console.log("middle");
// const mongoURI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1';
const mongoURI = 'mongodb+srv://abhay18:lvxpPiCuRe0n2wEF@atlascluster.vmitatq.mongodb.net/eshopping?retryWrites=true&w=majority';
console.log("end");

const connectToMongo = async() => {
    await mongoose.connect(mongoURI);
    console.log("Connected to mongoDB successfully!");
}

module.exports = connectToMongo;
