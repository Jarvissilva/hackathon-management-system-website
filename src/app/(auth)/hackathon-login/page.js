import HackathonLoginForm from "components/forms/hackathonLogin";
import { H1, SubmitButton } from "components/utilities";

export default function Page() {
  return (
    <div className="space-y-4">
      <H1>hackathon Login</H1>
      <HackathonLoginForm />
      <SubmitButton form="hackathon-login-form" text="Login" styles="w-full" />
    </div>
  );
}
