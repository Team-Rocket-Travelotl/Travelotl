const express = require('express');
const router = express.Router();
const tripController = require('../controllers/itinerary_controller');

router.post('/build', tripController.buildTrip, tripController.saveTrip, (req, res) => {
  res.status(201).send(res.locals.itinerary);
});

router.get('/retrieve', tripController.retrieveAll, (req, res) => {
  // console.log(res.locals.allTrips[0]._id);
  res.status(200).send(res.locals.allTrips);
});

router.delete('/delete', tripController.deleteTrip, (req, res) => {
  res.status(200).send();
})

module.exports = router;