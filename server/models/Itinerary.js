const mongoose = require('mongoose');

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
    trip: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('itinerary', ItinerarySchema);

// {"itinerary":{"2024-04-24":{"morning":{"activity":"Hiking","description":"Red Rock Canyon National Conservation Area offers scenic hiking trails with stunning rock formations and desert landscapes.","address":"1000 Scenic Loop Dr, Las Vegas, NV 89161"},"afternoon":{"activity":"Exploring","description":"Visit the Las Vegas Strip for iconic hotels, entertainment, and shopping.","address":"Las Vegas Blvd S, Las Vegas, NV 89109"},"evening":{"activity":"Free Shows","description":"Watch the famous Bellagio Fountains show in front of the Bellagio Hotel.","address":"3600 S Las Vegas Blvd, Las Vegas, NV 89109"}},"2024-04-25":{"morning":{"activity":"Hiking","description":"Valley of Fire State Park offers unique hiking trails surrounded by red sandstone formations.","address":"29450 Valley of Fire Hwy, Overton, NV 89040"},"afternoon":{"activity":"Sightseeing","description":"Explore Fremont Street Experience for live entertainment and historic casinos.","address":"425 Fremont St, Las Vegas, NV 89101"},"evening":{"activity":"Fremont Street Light Show","description":"Enjoy the dazzling light and sound show on the canopy of Fremont Street.","address":"425 Fremont St, Las Vegas, NV 89101"}},"2024-04-26":{"morning":{"activity":"Hiking","description":"Mt. Charleston provides cooler temperatures and scenic trails, perfect for a morning hike.","address":"Spring Mountains Visitor Gateway, 2525 Kyle Canyon Rd, Las Vegas, NV 89124"},"afternoon":{"activity":"Relaxation","description":"Visit the pools at a resort on the Strip for some relaxation and sunbathing.","address":"Choose a resort on the Las Vegas Strip"},"evening":{"activity":"Nightlife","description":"Experience the vibrant nightlife in downtown Las Vegas or find a rooftop bar for great views.","address":"Downtown Las Vegas or a rooftop bar on the Strip"}},"2024-04-27":{"morning":{"activity":"Hiking","description":"Explore the trails at Spring Mountain Ranch State Park for some nature and history.","address":"6375 NV-159, Blue Diamond, NV 89004"},"afternoon":{"activity":"Shopping","description":"Visit the Forum Shops at Caesars Palace or the Grand Canal Shoppes for some retail therapy.","address":"3500 S Las Vegas Blvd, Las Vegas, NV 89109 (Forum Shops) or 3377 S Las Vegas Blvd, Las Vegas, NV 89109 (Grand Canal Shoppes)"},"evening":{"activity":"Fremont Street Experience","description":"Enjoy the vibrant atmosphere and entertainment on Fremont Street.","address":"425 Fremont St, Las Vegas, NV 89101"}}}}
