import NewHackathonForm from "components/forms/newHackathon";
import { H1, SubmitButton } from "components/utilities";
import { getLoggedUser } from "actions/auth";

export default async function Page() {
  const authRes = await getLoggedUser();
  return (
    <>
      <div className="flex justify-between items-center">
        <H1 styles="grow">New Hackathon</H1>
        <SubmitButton form="new-hackathon-form" text="Save" />
      </div>
      <NewHackathonForm loggedUser={authRes.user} />
    </>
  );
}
