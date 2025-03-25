import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  name: String,
  description: String,
  assigned_teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  submissions: [
    {
      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
      file_url: String,
      evaluated: { type: Boolean, default: false },
      score: { type: Number, default: null },
    },
  ],
});

const roundSchema = new mongoose.Schema(
  {
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    number_of_teams_selected: { type: Number, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    assignment_mode: {
      type: String,
      enum: ["one-to-one", "one-to-many"],
      required: true,
    },
    problems: [problemSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Round || mongoose.model("Round", roundSchema);
