import mongoose from 'mongoose';

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
    required: false
  }
},
{
  timestamps: true
});

// define user model
const User = mongoose.model('User', userSchema);

// export user model
export default User;