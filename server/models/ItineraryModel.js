const mongoose = require('mongoose');

// const ActivitySchema = mongoose.Schema({
//   activity: { type: String, required: true },
//   description: { type: String, required: true },
//   address: { type: String, required: true }
// });

// const DayPartSchema = mongoose.Schema({
//   timeOfDay: { type: String, required: true },
//   event: ActivitySchema,
// });

// const DaySchema = mongoose.Schema({
//   date: { type: String, required: true },
//   dailyActivity: [DayPartSchema],
// });

const ItinerarySchema = mongoose.Schema({
  email: { type: String, required: true },
  itinerary: { type: String, required: true },
});



module.exports = mongoose.model('Itinerary', ItinerarySchema);