const itinerarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  text: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

const Itinerary =  mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;