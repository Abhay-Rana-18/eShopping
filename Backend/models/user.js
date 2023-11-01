const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  atc: {
    type: Array,
    default: [],
  }
});

const User = mongoose.model('user', userSchema);
module.exports = User;
