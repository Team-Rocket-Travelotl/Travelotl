const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(`firstName: ${firstName}, lastName: ${lastName}, email: ${email}, password: ${password}`)
    // check that all fields have been provided
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ error: 'Please add all required fields' })
      return;
    }

    // check if user already exists
    const userExists = await User.findOne({email});
    
    // console.log(userExists);
    if (userExists) {
      res.status(400).json({ error: 'User already exists'});
      return;
    }

    // hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({firstName, lastName, email, password: hashedPassword});

    if (user) {
      res.status(201).json({ _id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, token: generateToken(user._id) })
    } else {
      res.status(400).json({ error: 'Invalid user data'})
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error'});
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // check to see if a user with the provided email exists
  const user = await User.findOne({email});

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400).json({ error: 'Invalid credentials' })
  }
}

const getUser = async (req, res) => {
  const { _id, firstName, lastName, email } = await User.findById(req.user.id);
  try {
    res.status(200).json({ id: _id, firstName: firstName, lastName: lastName, email: email})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error'});
  }
  
}

//process.env.JWT_SECRET to replace the 2nd argument

// generate json web token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = { registerUser, loginUser, getUser };