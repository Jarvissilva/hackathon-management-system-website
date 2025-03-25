"use server";
import jwt from "jsonwebtoken";
import connectDatabase from "utilities/connectDatabase";
import TeamModel from "models/team";
import sendMail from "utilities/sendMail";
import HackathonModel from "models/hackathon";
import hackathon from "models/hackathon";

export async function registerHackathonTeam(_, formData) {
  try {
    await connectDatabase();

    console.log(formData);
    const members = formData.getAll("members");
    console.log(members);

    const newTeam = await new TeamModel({
      hackathon: formData.get("hackathon"),
      team_name: formData.get("team_name"),
      members: members.map((m) => ({
        name: m,
      })),
      leader_name: formData.get("leader_name"),
      leader_email: formData.get("leader_email"),
      leader_phone_number: formData.get("leader_phone_number"),
      status: "accepted",
    }).save();

    const foundHackathon = await HackathonModel.findOne({
      _id: formData.get("hackathon"),
    });

    const encodedToken = jwt.sign(
      { _id: newTeam._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 300,
      }
    );

    await sendMail({
      to: formData.get("leader_email"),
      subject: `Your login code ${foundHackathon.code}`,
      html: `Your hackathon login code use this for login ${foundHackathon.code} login by using this link:<a href="${process.env.SITE_URL}/verify-login?token=${encodedToken}&code=${foundHackathon.code}">Verify Now</a> or open the below link in your browser: <p>${process.env.SITE_URL}/verify-login?token=${encodedToken}&code=${foundHackathon.code}</p>`,
    });

    return { success: true, message: "Hackathon successfully joined" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getTeams(hackathonId) {
  try {
    await connectDatabase();

    const foundTeams = await TeamModel.find({
      hackathon: hackathonId,
    });

    if (!foundTeams[0]) return { success: false, message: "teams not found" };

    return JSON.parse(JSON.stringify({ success: true, teams: foundTeams }));
  } catch (error) {
    return { success: false, message: error.message };
  }
}
