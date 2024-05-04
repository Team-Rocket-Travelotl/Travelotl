const express = require("express");
const router = express.Router();
const {
  getUserEmailById,
  registerUser,
  loginUser,
  getUser,
  logoutUser,
} = require("../controllers/userController");
const { protect } = require("../controllers/authController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, getUser);
router.get("/:id/email", protect, getUserEmailById);
router.get("/logout", logoutUser);
module.exports = router;
