import ActivitySuggestion from "./ActivitySuggestion"

export default interface DailyItinerary {
  morning: ActivitySuggestion,
  afternoon: ActivitySuggestion,
  evening: ActivitySuggestion
}