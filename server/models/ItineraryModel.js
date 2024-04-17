const mongoose = require('mongoose');

const ItinerarySchema = mongoose.Schema({
  email: { type: String, required: true },
  itinerary: { type: String, required: true },
});



module.exports = mongoose.model('trips', ItinerarySchema);