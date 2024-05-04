import { AsyncControllerMethod, ControllerMethod } from "./ControllerMethods";

export default interface AuthController {
  protect: AsyncControllerMethod,
  googleLogin: ControllerMethod,
  handleOAuthResponse: AsyncControllerMethod
}