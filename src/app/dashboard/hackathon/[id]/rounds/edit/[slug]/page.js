import EditHackathonForm from "components/forms/editHackathon";
import { H1, SubmitButton } from "components/utilities";
import { getLoggedUser } from "actions/auth";
import { getHackathon } from "actions/hackathon";

export default async function Page({ params }) {
  const authRes = await getLoggedUser();

  const hackathonRes = await getHackathon(params.id);
  console.log(hackathonRes.hackathon.name);

  return (
    <>
      <div className="flex justify-between items-center">
        <H1 styles="grow">Edit Hackathon</H1>
        <SubmitButton form="edit-hackathon-form" text="Save" />
      </div>
      <EditHackathonForm
        loggedUser={authRes.user}
        hackathon={hackathonRes.hackathon}
      />
    </>
  );
}
