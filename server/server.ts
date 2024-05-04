import { Request, Response } from "express";

import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";

//use environmental variables
dotenv.config({ path: './config.env' });

// connect to MongoDB cluster
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.urlencoded({ extended: true })); //parse urlencoded bodies

app.use("/api/users", require("./routes/userRoutes.ts"));
app.use("/api/trip", require("./routes/itineraryRoutes.ts"));
app.use('/google-login', require('./routes/googleAuthRoutes.ts'));


app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(port, () => console.log(`Server is running on ${port}`));
