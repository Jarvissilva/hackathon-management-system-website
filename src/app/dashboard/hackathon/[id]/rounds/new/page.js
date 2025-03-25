import NewRoundForm from "components/forms/newRound";
import { H1, SubmitButton } from "components/utilities";
import { getHackathon } from "actions/hackathon";

export default async function Page({ params }) {
  const hackathonRes = await getHackathon(params.id);

  return (
    <>
      <div className="flex justify-between items-center">
        <H1 styles="grow">New Round</H1>
        <SubmitButton form="new-round-form" text="Save" />
      </div>
      <NewRoundForm hackathon={hackathonRes.hackathon} />
    </>
  );
}
