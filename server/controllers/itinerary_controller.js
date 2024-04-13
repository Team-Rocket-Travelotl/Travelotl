//Controller to call the Open AI API for information on destinations for the itinerary
// import { Configuration, OpenAI } from "openai";
const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});
const express = require('express');
const app = express();

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

// TEST DATA - DELETE WHEN FINISHED
const travelPlans = {
  destination: 'Los Angeles, CA',
  startDate: 'June 2, 2024',
  endDate: 'June 8, 2024',
  activities: [],
  budget: 500,
  travelers: 1,
  groupDescription: 'Solo traveler',
  loading: false,
  error: null,
}
// ========= end of TEST DATA ============

const tripController = {
  async buildTrip(req, res, next) {
    // Update prompt below to reflect req.body information
    const prompt = `Make an itinerary for a trip for ${travelPlans.travelers} to ${travelPlans.destination} from ${travelPlans.startDate} until ${travelPlans.endDate}. I have a budget of $${travelPlans.budget}. Include the following types of attractions: ${travelPlans.activities.join(', ')}. Organize the itinerary by the following times of day: morning, afternoon, and evening. Recommend specific places of interest with their address. Limit cross-city commutes by grouping places of interest by geography for each day. Output the response in json format following this schema:
    {
      itinerary: {
        date: {
          time of day: {
            activity: string,
            description: string,
            address: string,
          }
        }
      }
    }
    Thank you.`;

    console.log(prompt);
    try {
      const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a helpful travel planning assistant."},
            {
              "role": "user", 
              "content": prompt,
            }],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
      });
    
      console.log(JSON.parse(completion.choices[0].message.content));
      res.locals.itinerary = JSON.parse(completion.choices[0].message.content);
      return next();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = tripController;