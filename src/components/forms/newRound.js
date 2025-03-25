"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { TextInput, Textarea } from "components/form";
import { SelectInput } from "components/form";
import { newRound } from "actions/round";

export default function NewRoundForm({ hackathon }) {
  const [state, formAction] = useFormState(newRound, {
    success: false,
    message: "",
  });

  const [problemStatements, setProblemStatements] = useState([]);

  console.log(state);

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
        id="new-round-form"
        className="space-y-4"
        action={async (formData) => {
          await formAction(formData);
        }}
      >
        <input type="hidden" name="hackathon" value={hackathon._id} />
        <TextInput
          name="name"
          type="text"
          label="Round Name"
          placeholder="Enter round name"
          required
        />
        <TextInput
          name="number_of_teams_selected"
          type="number"
          label="Number of teams to be selected"
          placeholder="Enter number "
          required
        />
        <Textarea
          name="description"
          label="Round Description"
          placeholder="Describe the round"
          required
        />
        <TextInput
          name="start_time"
          type="datetime-local"
          label="Start Time"
          required
        />
        <TextInput
          name="end_time"
          type="datetime-local"
          label="End Time"
          required
        />
        <SelectInput
          name="assignment_mode"
          options={[
            { value: "one-to-one", label: "One to One" },
            { value: "one-to-many", label: "One to many" },
          ]}
          label="Problem Assignment Mode"
        />
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Add Problem Statements</h3>
          <button
            className="bg-blue-600 rounded-md px-4 py-2 text-white"
            onClick={() => setProblemStatements([...problemStatements, {}])}
          >
            Add
          </button>
        </div>
        <div>
          {problemStatements.map((p, index) => (
            <>
              <TextInput
                name="problem_name"
                type="text"
                label={`Problem Name ${index + 1}`}
                placeholder="Enter problem name"
              />
              <Textarea
                name="problem_description"
                label="Problem Description"
                placeholder="Describe the problem"
              />
            </>
          ))}
        </div>
      </form>
    </div>
  );
}
