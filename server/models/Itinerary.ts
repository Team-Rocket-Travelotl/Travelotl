import mongoose from 'mongoose';

const ItinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    tripName: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    // email: { type: String, required: true },
    trip: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

const Itinerary = mongoose.model('itinerary', ItinerarySchema);

export default Itinerary;
