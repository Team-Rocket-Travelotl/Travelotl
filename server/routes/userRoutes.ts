import express from "express";
import userController from "../controllers/userController";
import authController from "../controllers/authController";

const router = express.Router();

const { getUserEmailById, registerUser, loginUser, getUser, logoutUser } = userController;
const { protect } = authController;

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, getUser);
router.get("/:id/email", protect, getUserEmailById);
router.get("/logout", logoutUser);

export default router;
