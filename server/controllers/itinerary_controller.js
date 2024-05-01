//Controller to call the Open AI API for information on destinations for the itinerary
// import { Configuration, OpenAI } from "openai";
const OpenAI = require("openai");
const express = require("express");
const app = express();
const Itinerary = require("../models/Itinerary");
const { recompileSchema } = require("../models/User");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

// TEST DATA - DELETE WHEN FINISHEDßß
// const travelPlans = {
//   destination: 'Los Angeles, CA',
//   startDate: 'June 2, 2024',
//   endDate: 'June 8, 2024',
//   activities: [],
//   budget: 500,
//   travelers: 1,
//   groupDescription: 'Solo traveler',
//   loading: false,
//   error: null,
// }
// ========= end of TEST DATA ============

const tripController = {
  // buildTrip - To fetch itinerary from API request to Open AI
  async buildTrip(req, res, next) {
    console.log("buildTrip invoked");
    const {
      destination,
      startDate,
      endDate,
      activities,
      budget,
      travelers,
      groupDescription,
    } = req.body;
    res.locals.tripName = `${destination} from ${startDate} to ${endDate}`;
    // Update prompt below to reflect req.body information - DONE (J.H.)
    const prompt = `Make an itinerary for a trip for ${travelers} to ${destination} from ${startDate} until ${endDate}. I have a budget of ${budget}. Include the following types of attractions: ${activities.join(
      ", "
    )} for a ${groupDescription}. Organize the itinerary by the following times of day: morning, afternoon, and evening. Recommend specific places of interest with their address. Limit cross-city commutes by grouping places of interest by geography for each day. Output the response in json format following this schema:
    // {
    //   itinerary: {
    //     date: {
    //       time of day: {
    //         activity: string,
    //         description: string,
    //         address: string,
    //       }
    //     }
    //   }
    // }
    // Thank you.`;

    console.log("promp", prompt);
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful travel planning assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
      });

      console.log("completion", completion.choices[0]);
      res.locals.itinerary = JSON.parse(
        completion.choices[0].message.content
      ).itinerary;
      return next();
    } catch (err) {
      console.log(err);
    }
  },

  // saveTrip - To save the contents of the generated itinerary into the database
  saveTrip(req, res, next) {
    console.log("whats being passed in locals", res.locals.itinerary);
    // const { email } = req.body;
    Itinerary.create({
      // email: req.body.email,
      user: req.user._id,
      tripName: res.locals.tripName,
      destination: req.body.destination,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      trip: res.locals.itinerary,
    })
      .then((result) => {
        console.log("result after adding to db", result);
        console.log("itinerary successfully saved in database");
        return next();
      })
      .catch((err) => {
        console.log(
          "could not add itinerary to database - saveTrip middleware"
        );
        console.error("saveTrip ERROR =>", err);
      });
  },

  // deleteTrip - To delete the itinerary from the database based on the ObjectId
  deleteTrip(req, res, next) {
    console.log(req.body);
    console.log("deleteTrip Middleware - tripId:", req.body.tripId);
    Itinerary.findOneAndDelete({ _id: `${req.body.tripId}` })
      .then((result) => {
        if (result) {
          console.log("Itinerary deleted from the database - deleteTrip");
        } else {
          console.log("ObjectId not found. Nothing deleted");
        }
        return next();
      })
      .catch((err) => {
        console.log(
          "could not locate itinerary based on id passed in - deleteTrip middleware"
        );
        console.error("deleteTrip ERROR =>", err);
      });
  },

  // retrieveAll - To retrieve all trips saved for a specific user
  retrieveAll(req, res, next) {
    Itinerary.find({
      email: req.body.email,
    })
      .then((result) => {
        //console.log(result);
        res.locals.allTrips = result;
        //console.log("All trips retrieved - retrieveAllTrips middleware");
        return next();
      })
      .catch((err) => {
        console.log(
          "could not retrieve all trips - retrieveAllTrips middleware"
        );
        console.error("retrieveAllTrips ERROR =>", err);
      });
  },

  retrieveById(req, res, next) {
    console.log("in the backend");
    const userId = req.params.userId;
    console.log("userId", userId);
    Itinerary.find({
      user: userId,
    })
      .then((result) => {
        console.log(`result in retrieveById backend`, result);
        res.locals.TripsById = result;
        console.log("My trips retrieved - retrieveById middleware");
        return next();
      })
      .catch((err) => {
        console.log("could not retrieve my trips - retrieveById middleware");
        console.error("retrieveById ERROR =>", err);
      });
  },
};

/*
req. body = info
finduser and update
trip
trip at the date
at the time
value to be info
*/

module.exports = tripController;
