"use client";
import { useFormState } from "react-dom";
import { newUser } from "actions/auth";
import { TextInput } from "components/form";

export default function NewUserForm() {
  const [state, formAction] = useFormState(newUser, {
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
        id="new-user-form"
        className="space-y-4"
        action={async (formData) => {
          await formAction(formData);
        }}
      >
        <TextInput
          name="name"
          type="text"
          label="Name"
          placeholder="Enter your name"
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
