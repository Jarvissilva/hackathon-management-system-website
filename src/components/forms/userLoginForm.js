"use client";
import { useFormState } from "react-dom";
import { TextInput } from "components/form";
import { loginUser } from "actions/auth";

export default function UserLoginForm() {
  const [state, formAction] = useFormState(loginUser, {
    success: false,
    message: "",
  });

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
        id="user-login-form"
        className="space-y-4"
        action={async (formData) => {
          await formAction(formData);
        }}
      >
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
