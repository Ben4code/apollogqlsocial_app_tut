const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
  }
})

module.exports = mongoose.model('User', userSchema);