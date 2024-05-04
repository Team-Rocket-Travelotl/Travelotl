import express from 'express';
import authController from '../controllers/authController';
import userController from '../controllers/userController';

const router = express.Router();

const { googleLogin, handleOAuthResponse } = authController;
const { loginUserWithOAuth } = userController;

router.get('/auth', googleLogin);
router.get('/callback', handleOAuthResponse, loginUserWithOAuth);

export default router;