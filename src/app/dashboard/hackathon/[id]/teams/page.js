import { getHackathon } from "actions/hackathon";
import { getTeams } from "actions/team";
import { H1, H2, P } from "components/utilities";
import { FaAngleDown } from "react-icons/fa6";

export default async function Page({ params }) {
  const teamsRes = await getTeams(params.id);
  const hackathonRes = await getHackathon(params.id);

  return (
    <>
      <div className="flex justify-between items-center">
        <H1 styles="grow">Teams</H1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Enable Registration
        </button>
      </div>
      <div className="space-y-4">
        <P styles="p-2 bg-sky-50 border rounded-md text-lg">
          Share this link for registration:{" "}
          <span className="text-blue-600">{`${process.env.SITE_URL}/hackathon-register?id=${params.id}`}</span>
        </P>
        <div className="flex justify-between items-center">
          <H2 styles="text-xl">Registered Teams</H2>
          <P>
            {teamsRes.teams ? teamsRes.teams.length : 0}/
            {hackathonRes.hackathon.max_teams_registrations}
          </P>
        </div>
        <div className="space-y-4">
          {teamsRes.teams &&
            teamsRes.teams.map((team, index) => (
              <div key={index} className="border rounded-md">
                <div className="flex justify-between items-center border-b p-4">
                  <h3>
                    <strong>Team Name:</strong> {team.team_name}
                  </h3>
                  <FaAngleDown />
                </div>
                <div className="p-4">
                  <div className="flex justify-start gap-4 items-center">
                    <P>
                      <strong>Leader:</strong> {team.leader_name}
                    </P>
                    <P>
                      <strong>Email:</strong> {team.leader_email}
                    </P>
                    <P>
                      <strong>Contact No:</strong> {team.leader_phone_number}
                    </P>
                  </div>
                  {team.members[0] &&
                    team.members.map((tm, index) => (
                      <div
                        key={index}
                        className="flex justify-start gap-4 items-center"
                      >
                        <P>
                          <strong>Member:</strong> {tm.name}
                        </P>
                      </div>
                    ))}
                </div>
                <div></div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
