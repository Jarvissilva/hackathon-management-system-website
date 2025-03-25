"use client";
import { useFormState } from "react-dom";
import { TextInput } from "components/form";
import { loginHackathon } from "actions/auth";

export default function HackathonLoginForm() {
  const [state, formAction] = useFormState(loginHackathon, {
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
        id="hackathon-login-form"
        className="space-y-4"
        action={async (formData) => {
          await formAction(formData);
        }}
      >
        <TextInput
          name="code"
          type="text"
          label="Hackathon Code"
          placeholder="Enter code"
        />
        <TextInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
        />
      </form>
    </div>
  );
}
