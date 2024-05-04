import UserController from "../interfaces/UserController";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const userController: UserController = {
  registerUser: async (req, res, next) => {
    console.log("request to register user", req.body);
    try {
      const { firstName, lastName, email, password } = req.body;

      // check that all fields have been provided
      if (!firstName || !lastName || !email || !password) {
        res.status(400).json({ error: "Please add all required fields" });
        return;
      }

      // check if user already exists
      const userExists = await User.findOne({ email });

      // console.log(userExists);
      if (userExists) {
        res.status(400).json({ error: "User already exists" });
        return;
      }

      // hash password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create user
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      if (user) {
        res.status(201).json({
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ error: "Invalid user data" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  loginUser: async (req, res, next) => {
    console.log("request to login user", req.body);
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      return res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  loginUserWithOAuth: async (req, res, next) => {
    const { email, given_name: firstName, family_name: lastName } = res.locals;

    const existingUser = await User.findOne({ email });
    const user = existingUser 
      ? existingUser
      : await User.create({ firstName, lastName, email });

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.cookie('authorization', token);
    res.redirect('/oauth-success');
  },

  logoutUser: (req, res) => {
    console.log(`in backend logout user`);
  },

  getUser: async (req, res, next) => {
    const user = await User.findById(res.locals.user.id);
    try {
      res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getUserEmailById: async (req, res, next) => {
    console.log(`in the getUserEmailById`);
    const { id } = req.params;
    console.log(`id`, id);
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
      res.json({ email: user.email });
    } catch (err) {
      console.log(`Error fetching user email ${err}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// generate json web token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = userController;
