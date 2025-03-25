"use server";
import connectDatabase from "utilities/connectDatabase";
import HackathonModel from "models/hackathon";

const generateUniqueCode = async () => {
  let code;
  let existingTeam;

  do {
    code = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit code
    existingTeam = await HackathonModel.findOne({ code: code });
  } while (existingTeam);

  return code;
};

export async function newHackathon(_, formData) {
  console.log(formData);
  try {
    await connectDatabase();

    const uniqueCode = await generateUniqueCode();

    await new HackathonModel({
      name: formData.get("name"),
      code: uniqueCode,
      description: formData.get("description"),
      created_by: formData.get("created_by"),
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date"),
      last_registration_date: formData.get("last_registration_date"),
      max_teams_registrations: formData.get("max_teams_registrations"),
      max_team_size: formData.get("max_team_size"),
      min_team_size: formData.get("min_team_size"),
      final_team_slot: formData.get("final_team_slot"),
      rules_and_regulations: formData.get("rules_and_regulations"),
      website_url: formData.get("website_url"),
    }).save();

    return { success: true, message: "Hackathon successfully created" };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

export async function getHackathons(userId) {
  try {
    await connectDatabase();

    const foundHackathons = await HackathonModel.find({
      created_by: userId,
    });

    if (!foundHackathons[0])
      return { success: false, message: "hackathons not found" };

    return JSON.parse(
      JSON.stringify({ success: true, hackathons: foundHackathons })
    );
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function getHackathon(id) {
  try {
    await connectDatabase();

    const foundHackathon = await HackathonModel.findOne({
      _id: id,
    });

    if (!foundHackathon)
      return { success: false, message: "hackathon not found" };

    return JSON.parse(
      JSON.stringify({ success: true, hackathon: foundHackathon })
    );
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function editHackathon(_, formData) {
  try {
    await connectDatabase();

    const updatedHackathon = await HackathonModel.findByIdAndUpdate(
      formData.get("id"),
      {
        name: formData.get("name"),
        description: formData.get("description"),
        start_date: formData.get("start_date")
          ? new Date(formData.get("start_date"))
          : null,
        end_date: formData.get("end_date")
          ? new Date(formData.get("end_date"))
          : null,
        last_registration_date: formData.get("last_registration_date")
          ? new Date(formData.get("last_registration_date"))
          : null,
        max_teams_registrations: formData.get("max_teams_registrations"),
        max_team_size: formData.get("max_team_size"),
        min_team_size: formData.get("min_team_size"),
        final_team_slot: formData.get("final_team_slot"),
        rules_and_regulations: formData.get("rules_and_regulations"),
        website_url: formData.get("website_url"),
      },
      { new: true }
    );

    if (!updatedHackathon) {
      return { success: false, message: "Hackathon could not be updated" };
    }

    return { success: true, message: "Hackathon successfully updated" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
