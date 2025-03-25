"use client";
import { useFormState } from "react-dom";
import { roundSubmission } from "actions/round";
import { TextInput } from "components/form";

export default function RoundSubmissionForm({ userId, roundId }) {
  const [state, formAction] = useFormState(roundSubmission, {
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
        id="round-submission-form"
        className="space-y-4"
        action={async (formData) => {
          await formAction(formData);
        }}
      >
        <input type="hidden" name="user_id" value={userId} />
        <input type="hidden" name="round_id" value={roundId} />
        <TextInput label="Enter your url" name="file_url" type="url" />
      </form>
    </div>
  );
}
