import { NextFunction, Request, Response } from "express";

const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authController = require('../controllers/authController');

router.post(
  '/build',
  (req: Request, res: Response, next: NextFunction) => {
    console.log('build route invoked');
    return next();
  },
  authController.protect,
  tripController.buildTrip,
  tripController.saveTrip,
  (req: Request, res: Response) => {
    console.log('/build result', res.locals.tripDetails);
    res.status(200).json(res.locals.tripDetails);
  }
);

router.get(
  '/retrieve',
  authController.protect,
  tripController.retrieveAll,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.allTrips);
  }
);

router.get(
  '/retrieveById/:userId',
  authController.protect,
  tripController.retrieveById,
  (req: Request, res: Response) => {
    console.log('in the retrieveById');
    res.status(200).json(res.locals.TripsById);
  }
);

router.delete(
  '/delete',
  authController.protect,
  tripController.deleteTrip,
  tripController.retrieveAll,
  (req: Request, res: Response) => {
    res.status(200).send(res.locals.allTrips);
  }
);

router.patch('/update', tripController.updateTrip, (req: Request, res: Response) => {
  console.log('lets edit some stuff!', req.body.itinerary);
  res.status(200).json(res.locals.updatedItinerary);
});

module.exports = router;
