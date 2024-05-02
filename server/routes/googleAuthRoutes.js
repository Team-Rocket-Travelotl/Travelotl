const express = require('express');
const router = express.Router();
const { googleLogin, handleOAuthResponse } = require('../controllers/auth_controller');
const { loginUserWithOAuth } = require('../controllers/userController');

router.get('/auth', googleLogin);
router.get('/callback', handleOAuthResponse, loginUserWithOAuth);

module.exports = router;