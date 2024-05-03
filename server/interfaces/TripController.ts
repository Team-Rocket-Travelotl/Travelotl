import { ControllerMethod, AsyncControllerMethod } from "./ControllerMethods";

export default interface TripController {
  buildTrip: AsyncControllerMethod,
  saveTrip: ControllerMethod,
  deleteTrip: ControllerMethod,
  retrieveAll: ControllerMethod,
  retrieveById: ControllerMethod,
  updateTrip: AsyncControllerMethod
}