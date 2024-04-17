const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User',
  // },
  // tripId: { type: mongoose.Schema.Types.ObjectId },
  email: { type: String, required: true },
  trip: { type: String, required: true },
},{
  timestamps: true
});

module.exports = mongoose.model('itinerary', ItinerarySchema);