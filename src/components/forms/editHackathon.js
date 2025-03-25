"use client";
import { useFormState } from "react-dom";
import { editHackathon } from "actions/hackathon";
import { Textarea, TextInput } from "components/form";

export default function EditHackathonForm({ loggedUser, hackathon }) {
  const [state, formAction] = useFormState(editHackathon, {
    success: false,
    message: "",
  });

  console.log(hackathon);

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
        id="edit-hackathon-form"
        className="space-y-4"
        action={async (formData) => {
          await formAction(formData);
        }}
      >
        <input type="hidden" name="id" value={hackathon._id} />
        <TextInput
          name="name"
          type="text"
          label="Name of the hackathon"
          placeholder="Enter hackathon name"
          defaultValue={hackathon.name}
        />
        <Textarea
          name="description"
          label="Description"
          required={false}
          placeholder="Enter rules & regulations"
          value={hackathon.description}
        />
        <TextInput
          name="start_date"
          type="datetime-local"
          label="Start date & time"
          defaultValue={new Date(hackathon.start_date)
            .toISOString()
            .slice(0, 16)}
        />
        <TextInput
          name="end_date"
          type="datetime-local"
          label="End date & time"
          defaultValue={new Date(hackathon.end_date).toISOString().slice(0, 16)}
        />
        <TextInput
          name="last_registration_date"
          type="datetime-local"
          label="Last date of registration"
          defaultValue={
            hackathon?.last_registration_date
              ? new Date(hackathon.last_registration_date)
                  .toISOString()
                  .slice(0, 16)
              : ""
          }
        />

        <TextInput
          name="max_teams_registrations"
          type="number"
          label="Maximum number of teams registrations"
          defaultValue={hackathon?.max_teams_registrations || ""}
        />

        <TextInput
          name="max_team_size"
          type="number"
          label="Maximum Members in a team"
          placeholder="Set max number of members in a team"
          defaultValue={hackathon?.max_team_size || ""}
        />

        <TextInput
          name="min_team_size"
          type="number"
          label="Minimum Members in a team"
          placeholder="Set min number of members in a team"
          defaultValue={hackathon?.min_team_size || ""}
        />

        <TextInput
          name="final_team_slot"
          type="number"
          label="Maximum number of teams for hackathon"
          defaultValue={hackathon?.final_team_slot || ""}
        />

        <Textarea
          name="rules_and_regulations"
          label="Rules & Regulations"
          placeholder="Enter rules & regulations"
          value={hackathon?.rules_and_regulations || ""}
        />

        <TextInput
          name="website_url"
          type="url"
          label="Hackathon website url"
          placeholder="https://example.com"
          defaultValue={hackathon?.website_url || ""}
        />
      </form>
    </div>
  );
}
