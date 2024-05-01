import CompleteItinerary from "./CompleteItinerary";

export default interface TripDetails {
  _id: string,
  tripName: string,
  destination: string,
  createdAt: string,
  updatedAt: string,
  startDate: string,
  endDate: string,
  trip: CompleteItinerary,
  user: string,
}