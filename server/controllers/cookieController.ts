import CookieController from "../interfaces/CookieController";

const cookieController = {} as CookieController;

cookieController.setCookie = (req, res, next) => {
  res.cookie('userId', req.headers.authorization);
  return next();
}

module.exports = cookieController;