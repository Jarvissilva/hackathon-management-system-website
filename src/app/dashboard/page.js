import { getLoggedUser } from "actions/auth";
import { H1, LinkButton } from "components/utilities";

export default async function Page({ params, searchParams }) {
  const authRes = await getLoggedUser();
  const user = authRes.user;
  const isCoordinator = "coordinator";

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <H1 styles="grow">Dashboard</H1>
        {isCoordinator && (
          <LinkButton
            to={`/dashboard/hackathon/edit/${searchParams.id || params.id}`}
          >
            Edit Hackathon
          </LinkButton>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Total Hackathons</h2>
          <p className="text-2xl font-bold">1</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Teams Registered</h2>
          <p className="text-2xl font-bold">3</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Total members</h2>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
        <div className="flex space-x-4">
          {isCoordinator && (
            <LinkButton to="/dashboard/hackathon/create">
              Create Hackathon
            </LinkButton>
          )}
          <LinkButton to="/dashboard/hackathons">View Hackathons</LinkButton>
          <LinkButton to="/dashboard/announcements">
            View Announcements
          </LinkButton>
        </div>
      </div>
    </>
  );
}
