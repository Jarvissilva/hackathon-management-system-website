"use client";
import { useFormState } from "react-dom";
import { newHackathon } from "actions/hackathon";
import { InputContainer, Label, Textarea, TextInput } from "components/form";

export default function NewHackathonForm({ loggedUser }) {
  console.log(loggedUser);
  const [state, formAction] = useFormState(newHackathon, {
    success: false,
    message: "",
  });

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
        id="new-hackathon-form"
        className="space-y-4"
        action={async (formData) => {
          await formAction(formData);
        }}
      >
        <input type="hidden" name="created_by" value={loggedUser._id} />
        <TextInput
          name="name"
          type="text"
          label="Name of the hackathon"
          placeholder="Enter hackathon name"
        />
        <Textarea
          name="description"
          label="Description"
          required={false}
          placeholder="Enter rules & regulations"
        />
        <TextInput
          name="start_date"
          type="datetime-local"
          label="Start date & time"
        />
        <TextInput
          name="end_date"
          type="datetime-local"
          label="End date & time"
        />
        <TextInput
          name="last_registration_date"
          type="datetime-local"
          label="Last date of registration"
        />

        <TextInput
          name="max_teams_registrations"
          type="number"
          label="Maximum number of teams registrations"
        />
        <TextInput
          name="max_team_size"
          type="number"
          label="Maximum Members in a team"
          placeholder="Set max number of members in a team"
        />
        <TextInput
          name="min_team_size"
          type="number"
          label="Minimum Members in a team"
          placeholder="Set min number of members in a team"
        />
        <TextInput
          name="final_team_slot"
          type="number"
          label="Maximum number of teams for hackathon"
        />

        <Textarea
          name="rules_and_regulations"
          label="Rules & Regulations"
          placeholder="Enter rules & regulations"
        />

        <TextInput
          name="website_url"
          type="url"
          label="Hackathon website url"
          placeholder="https://example.com"
        />
      </form>
    </div>
  );
}
