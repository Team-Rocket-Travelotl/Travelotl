// const { Cookie } = require("express-session");

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  res.cookie('userId', req.header.authorization);
  return next();
}