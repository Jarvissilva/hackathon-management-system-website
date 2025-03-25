"use server";
import RoundModel from "models/round";
import connectDatabase from "utilities/connectDatabase";

export async function newRound(_, formData) {
  try {
    await connectDatabase();
    const problemNames = formData.getAll("problem_name");
    const problemDescriptions = formData.getAll("problem_description");

    // Combine into an array of objects
    const problems = problemNames.map((name, index) => ({
      name,
      description: problemDescriptions[index] || "",
    }));

    await new RoundModel({
      hackathon: formData.get("hackathon"),
      name: formData.get("name"),
      description: formData.get("description"),
      number_of_teams_selected: formData.get("number_of_teams_selected"),
      start_time: new Date(formData.get("start_time")),
      end_time: new Date(formData.get("end_time")),
      assignment_mode: formData.get("assignment_mode"),
      problems: problems,
    }).save();

    return { success: true, message: "Round successfully created" };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

export async function getRounds(hackathonId) {
  try {
    await connectDatabase();

    const foundRounds = await RoundModel.find({
      hackathon: hackathonId,
    });

    if (!foundRounds[0])
      return { success: false, message: "No rounds created" };

    return JSON.parse(JSON.stringify({ success: true, rounds: foundRounds }));
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function getRound(roundId) {
  try {
    await connectDatabase();

    const foundRound = await RoundModel.findById(roundId);

    if (!foundRound) return { success: false, message: "No round created" };

    return JSON.parse(JSON.stringify({ success: true, round: foundRound }));
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function selectRoundProblem(roundId, problemId, userId) {
  try {
    await connectDatabase();

    const foundRound = await RoundModel.findOne({ _id: roundId });
    console.log(foundRound);

    const foundProblem = await foundRound.problems.find(
      (p) => p._id == problemId
    );

    if (!foundProblem) return { success: false, message: "Problem not found" };

    const isAlreadySelected = await foundRound.problems.find((p) =>
      p.assigned_teams.find((at) => at == userId)
    );

    if (isAlreadySelected)
      return { success: false, message: "You already selected a problem" };

    if (foundProblem.assignment_mode == "one-to-one") {
      if (foundProblem.assigned_teams[0]) {
        return { success: false, message: "Problem already taken by others" };
      }
    }

    foundProblem.assigned_teams.push(userId);
    await foundRound.save();

    return JSON.parse(
      JSON.stringify({ success: true, message: "Selected successfully" })
    );
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function roundSubmission(_, formData) {
  try {
    await connectDatabase();

    const foundRound = await RoundModel.findOne({
      _id: formData.get("round_id"),
    });
    console.log(foundRound);

    const foundProblem = await foundRound.problems.find((p) =>
      p.assigned_teams.find((at) => at == formData.get("user_id"))
    );

    if (!foundProblem) return { success: false, message: "Problem not found" };

    const isAlreadySubmitted = await foundRound.problems.find((p) =>
      p.submissions.find((s) => s.team == userId)
    );

    if (isAlreadySubmitted)
      return { success: false, message: "You already submitted" };

    foundProblem.submissions.push({
      team: formData.get("user_id"),
      file_url: formData.get("file_url"),
    });
    await foundRound.save();

    return JSON.parse(
      JSON.stringify({ success: true, message: "Submitted successfully" })
    );
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function evaluateRound(roundId, userId, score) {
  try {
    await connectDatabase();

    const foundRound = await RoundModel.findOne({
      _id: roundId,
    });

    const foundProblem = await foundRound.problems.find((p) =>
      p.assigned_teams.find((at) => at == userId)
    );

    if (!foundProblem) return { success: false, message: "Problem not found" };

    const foundSubmission = foundProblem.submissions.find((s) =>
      console.log(s)
    );
    console.log("fkdsahflkjhasdkjfhsdkjlahfkljah");
    console.log("dfasd", foundSubmission);
    if (!foundSubmission) console.log("fdshfkasdjhfkj");
    // return { success: false, message: "Submission not found" };

    foundSubmission.score = score;
    foundSubmission.evaluated = true;
    await foundRound.save();

    return JSON.parse(
      JSON.stringify({ success: true, message: "Evaluated successfully" })
    );
  } catch (error) {
    return { success: false, message: error.message };
  }
}
