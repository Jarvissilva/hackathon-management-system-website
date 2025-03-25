import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true,
    },
    team_name: { type: String, required: true },
    members: [
      {
        name: String,
      },
    ],
    leader_name: { type: String, required: true },
    leader_email: { type: String, required: true },
    leader_phone_number: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "accepted",
    },
  },

  { timestamps: true }
);

export default mongoose.models.Team || mongoose.model("Team", teamSchema);
