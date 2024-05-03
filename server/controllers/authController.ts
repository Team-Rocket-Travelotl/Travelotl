const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { google } = require('googleapis');
const url = require('url');

import { Request, Response, NextFunction } from 'express';
import ServerErrorResponse from '../interfaces/ServerErrorResponse';
import AuthController from '../interfaces/AuthController';
import GoogleUser from '../interfaces/GoogleUser';

const { CLIENT_ID, CLIENT_SECRET } = process.env;

const callbackURL = 'http://localhost:5173/google-login/callback';
const GOOGLE_OAUTH_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  callbackURL
);

const protect = async (req: Request, res: Response<ServerErrorResponse, Record<string, any>>, next: NextFunction) => {
  let token: string;
  console.log(req.headers.authorization);
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token, not including the hashed password
      res.locals.user = await User.findById(decoded.id).select('-password')

      return next();
    } catch (error) {
      console.log(error)
      res.status(401).json({ error: 'Not authorized'})

    }
  }
  else {
    res.status(401).json({ error: 'Not authorized, no token'})
  }
}

const googleLogin = (req: Request, res: Response) => {

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
    prompt: 'select_account',
  });

  return res.redirect(authorizationUrl);
};

const handleOAuthResponse = async (req: Request, res: Response, next: NextFunction) => {
  console.log('handling oauth response');
  const { query } = url.parse(req.url, true);
  const { tokens } = await oauth2Client.getToken(query.code);
  await oauth2Client.setCredentials(tokens);

  const oAuthResponse = await fetch(GOOGLE_OAUTH_URL, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`
    }
  });
  const data: GoogleUser | any = await oAuthResponse.json();
  const { email, given_name, family_name } = data;
  res.locals = { email, given_name, family_name };
  return next();
}


const authController: AuthController = { protect, googleLogin, handleOAuthResponse }
module.exports = authController;