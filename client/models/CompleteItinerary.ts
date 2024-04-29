import DailyItinerary from "./DailyItinerary";

export default interface CompleteItinerary {
  [date: string]: DailyItinerary
}