const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { google } = require('googleapis');
const url = require('url');

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  callbackURL
);

const callbackURL = 'http://localhost:5173/google-login/callback';
const GOOGLE_OAUTH_URL = "https://www.googleapis.com/oauth2/v2/userinfo";


const protect = async (req, res, next) => {
  let token
  console.log(req.headers.authorization);
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)


      // Get user from the token, not including the hashed password
      req.user = await User.findById(decoded.id).select('-password')
      console.log(req.user);

      next()
    } catch (error) {
      console.log(error)
      res.status(401).json({ error: 'Not authorized'})

    }
  }
  else {
    res.status(401).json({ error: 'Not authorized, no token'})
  }
}

const googleLogin = (req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'online',
    /** Pass in the scopes array defined above.
     * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true,
  });

  return res.redirect(301, authorizationUrl);
};

const handleOAuthResponse = async (req, res) => {
  const { query } = url.parse(req.url, true);
  const { tokens } = await oauth2Client.getToken(query.code);
  await oauth2Client.setCredentials(tokens);

  const oAuthResponse = await fetch(GOOGLE_OAUTH_URL, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`
    }
  });
  const data = await oAuthResponse.json();
  console.log(data);
  return next();
}


module.exports = { protect, googleLogin, handleOAuthResponse }