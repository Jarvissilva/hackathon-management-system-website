import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    prize: {
      type: String,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    last_registration_date: {
      type: Date,
      required: true,
    },
    max_teams_registrations: {
      type: Number,
      required: true,
    },
    max_team_size: {
      type: Number,
      required: true,
    },
    min_team_size: {
      type: Number,
      required: true,
    },
    final_team_slot: {
      type: Number,
      required: true,
    },
    rules_and_regulations: {
      type: String,
    },
    website_url: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Hackathon ||
  mongoose.model("Hackathon", hackathonSchema);
