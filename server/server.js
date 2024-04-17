const express = require ('express');
const path = require('path');

// TEST CODE - CAN DELETE WHEN FINISHED
const tripController = require('./controllers/itinerary_controller');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'../index.html'))
})

app.post('/api/trip', tripController.buildTrip, (req, res) => {
  res.status(200).send(res.locals.itinerary);
})


app.listen(port, () => console.log(`Server is running on ${port}`));