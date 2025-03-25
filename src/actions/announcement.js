"use server";
import AnnouncementModel from "models/AnnouncementModel";
import connectDatabase from "utilities/connectDatabase";

// POST Announcement (Only for Coordinators/Volunteers)
export async function postAnnouncement(_, formData) {
  try {
    await connectDatabase();

    const userRole = formData.get("user_role"); // Coordinator or Volunteer
    if (userRole !== "coordinator" && userRole !== "volunteer") {
      return { success: false, message: "Unauthorized to post announcements" };
    }

    const newAnnouncement = new AnnouncementModel({
      hackathonId: formData.get("hackathon_id"),
      title: formData.get("title"),
      message: formData.get("message"),
      postedBy: formData.get("user_id"),
    });

    await newAnnouncement.save();
    return { success: true, message: "Announcement posted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getAnnouncements(hackathonId, userRole) {
  try {
    await connectDatabase();

    if (userRole !== "team_leader") {
      return { success: false, message: "Unauthorized to view announcements" };
    }

    const announcements = await AnnouncementModel.find({ hackathonId }).sort({
      timestamp: -1,
    });

    if (!announcements.length) {
      return { success: false, message: "No announcements available" };
    }

    return {
      success: true,
      announcements: JSON.parse(JSON.stringify(announcements)),
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
