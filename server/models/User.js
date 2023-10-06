const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isAdmin:{
    type: Boolean,
    default:false
},
  password: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('user', userSchema);