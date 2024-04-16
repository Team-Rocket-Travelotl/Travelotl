const mongoose = require('mongoose');

// const ItinerarySchema = mongoose.Schema({
//   itinerary: {
//     date: {
//       timeOfDay: {
//         activity: string,
//         description: string,
//         address: string,
//       }
//     }
//   }
// })

const ActivitySchema = mongoose.Schema({
  activity: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true }
});

const DayPartSchema = mongoose.Schema({
  timeOfDay: { type: String, required: true },
  event: ActivitySchema,
});

const DaySchema = mongoose.Schema({
  date: { type: String, required: true },
  dailyActivity: [DayPartSchema],
});

const ItinerarySchema = mongoose.Schema({
  itinerary: [DaySchema],
});



module.exports = mongoose.model('Itinerary', ItinerarySchema);