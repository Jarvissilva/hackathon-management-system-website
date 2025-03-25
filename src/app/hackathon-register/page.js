import HackathonRegistrationForm from "components/forms/hackathonRegistration";
import { H1, P, SubmitButton } from "components/utilities";
import { getHackathon } from "actions/hackathon";
import formatDate from "utilities/formatDate";
import Easter from "components/easter";

export default async function Page({ searchParams }) {
  const hackathonRes = await getHackathon(searchParams.id);

  const hackathon = hackathonRes.hackathon;
  console.log(hackathon);
  return (
    <main className="flex flex-col justify-center items-center py-20">
      <div className="w-[50%]  rounded-md border p-4">
        <H1 styles="grow">
          {/* {hackathon.name} */}
          Technothon 2025
        </H1>
        <P>
          {/* {hackathon.description} */}
          Greetings, players. You have been invited to compete in Technothon
          3.0, a 24-hour battle of skill, logic, and endurance. The clock is
          ticking, the stakes are high. Will you outcode the competition, battle
          against drowsiness and squash your bugs in time? Register if you dare
        </P>
        <P>
          <strong>Start Date:</strong> {formatDate(hackathon.start_date)}
        </P>
        <P>
          <strong>End Date:</strong> {formatDate(hackathon.end_date)}
        </P>
        <P>
          <strong>Last date to register:</strong>{" "}
          {formatDate(hackathon.last_registration_date)}
        </P>
        <P>{hackathon.rules_and_regulations}</P>
        <Easter />
        <HackathonRegistrationForm hackathon={hackathon} />
      </div>
    </main>
  );
}
