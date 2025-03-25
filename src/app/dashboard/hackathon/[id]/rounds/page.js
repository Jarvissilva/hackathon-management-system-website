import { getLoggedUser } from "actions/auth";
import { getRounds } from "actions/round";
import { H1, H2, P, LinkButton } from "components/utilities";

export default async function Page({ params }) {
  const authRes = await getLoggedUser();
  const roundsRes = await getRounds(params.id);

  return (
    <>
      <div className="flex justify-between items-center">
        <H1 styles="grow">Rounds</H1>
        {authRes.user.team_name ? null : (
          <LinkButton to={`/dashboard/hackathon/${params.id}/rounds/new`}>
            New
          </LinkButton>
        )}
      </div>
      <div className="space-y-4">
        {roundsRes.rounds &&
          roundsRes.rounds.map((round, index) => (
            <div
              key={index}
              className="border rounded-md p-4 flex justify-between items-center"
            >
              <H2 styles="text-xl">{round.name}</H2>
              <LinkButton
                to={`/dashboard/hackathon/${params.id}/rounds/${round._id}`}
              >
                View
              </LinkButton>
            </div>
          ))}
      </div>
    </>
  );
}
