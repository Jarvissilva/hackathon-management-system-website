import mongoose from "mongoose";

import UserModel from "models/user";
import TeamModel from "models/team";
import HackathonModel from "models/hackathon";
import RoundModel from "models/round";

const connectDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Database already connected");
    return;
  } else {
    console.log("Database connected");
    return mongoose.connect(process.env.DATABASE_CONNECTION_URI);
  }
};

export default connectDatabase;
