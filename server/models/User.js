const mongoose = require('mongoose');

// define userSchema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

// define user model
const User = mongoose.model('User', userSchema);

// export user model
module.exports = User;