"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { InputContainer, Label, TextInput } from "components/form";
import { registerHackathonTeam } from "actions/team";

export default function HackathonRegistrationForm({ hackathon }) {
  const [state, formAction] = useFormState(registerHackathonTeam, {
    success: false,
    message: "",
  });

  const [teamMembers, setTeamMembers] = useState(1);

  console.log(teamMembers);

  return (
    <div>
      <p
        className={`mt-2 text-center font-bold ${
          state?.success ? "text-green-500" : "text-red-500"
        }`}
      >
        {state?.message}
      </p>
      <form
        id="hackathon-registration-form"
        className="space-y-4"
        action={async (formData) => {
          await formAction(formData);
        }}
      >
        <input type="hidden" name="hackathon" value={hackathon._id} />
        <TextInput
          name="team_name"
          type="text"
          label="Team Name"
          placeholder="Enter Team Name"
        />
        <TextInput
          name="college_name"
          type="text"
          label="College Name"
          placeholder="Enter College Name"
        />
        <InputContainer>
          <Label label="Team Size" />
          <select
            name="team_size"
            className="bg-white border rounded-md w-full p-4"
            onChange={(e) => setTeamMembers(e.target.value)}
          >
            <option value="">Select Team Size</option>
            {Array.from(
              { length: hackathon.max_team_size - hackathon.min_team_size + 1 },
              (_, i) => (
                <option key={i} value={hackathon.min_team_size + i}>
                  {hackathon.min_team_size + i} Members
                </option>
              )
            )}
          </select>
        </InputContainer>

        <TextInput
          name="leader_name"
          type="text"
          label="Team Leader Name"
          placeholder="Enter Leader Name"
        />
        <TextInput
          name="leader_email"
          type="email"
          label="Email"
          placeholder="Enter Leader Email"
        />
        <TextInput
          name="leader_phone_number"
          type="number"
          label="Phone Number"
          placeholder="Enter Leader Phone Number"
        />

        {[...Array(teamMembers - 1)].map((_, index) => (
          <div className="Members" key={index}>
            <TextInput
              name={`members`}
              type="text"
              label={`Member ${index + 1} Name`}
              placeholder="Enter Name"
            />
          </div>
        ))}
        <button className="bg-blue-600 w-full text-white rounded-md p-4 font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
}
