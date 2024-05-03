import { AsyncControllerMethod, ControllerMethod } from "./ControllerMethods";

export default interface UserController {
  registerUser: AsyncControllerMethod,
  loginUser: AsyncControllerMethod,
  loginUserWithOAuth: AsyncControllerMethod,
  getUser: AsyncControllerMethod,
  getUserEmailById: AsyncControllerMethod,
  logoutUser: ControllerMethod
}