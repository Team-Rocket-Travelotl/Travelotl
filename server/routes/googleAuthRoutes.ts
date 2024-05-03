const express = require('express');
const router = express.Router();
const { googleLogin, handleOAuthResponse } = require('../controllers/authController');
const { loginUserWithOAuth } = require('../controllers/userController');

const authController = require('../controllers/authController');

router.get('/auth', googleLogin);
router.get('/callback', handleOAuthResponse, loginUserWithOAuth);

module.exports = router;