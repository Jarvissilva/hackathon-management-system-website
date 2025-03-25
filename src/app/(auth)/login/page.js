import UserLoginForm from "components/forms/userLoginForm";
import { H1, SubmitButton } from "components/utilities";

export default function Page() {
  return (
    <div className="space-y-4">
      <H1>Welcome Back</H1>
      <UserLoginForm />
      <SubmitButton form="user-login-form" text="Login" styles="w-full" />
    </div>
  );
}
