import NewUserForm from "components/forms/newUser";
import { H1, SubmitButton } from "components/utilities";

export default function Page() {
  return (
    <div className="space-y-4">
      <H1>Let's get started</H1>
      <NewUserForm />
      <SubmitButton styles="w-full" form="new-user-form" text="Register" />
    </div>
  );
}
