import { redirect } from "next/navigation";
import { getLoggedUser } from "actions/auth";
import Navbar from "components/navbar";
import { getHackathons } from "actions/hackathon";

export default async function Layout({ children }) {
  const authRes = await getLoggedUser();
  if (!authRes.success) redirect("/");

  const hackathonsRes = await getHackathons(authRes.user._id);

  return (
    <>
      <main className="flex">
        <Navbar
          loggedUser={authRes.user}
          hackathons={hackathonsRes.hackathons}
        />
        <section className="w-[85%] bg-sky-50 p-4">
          <div className="h-full space-y-5 rounded-md border border-gray-200 bg-white p-6">
            {children}
          </div>
        </section>
      </main>
    </>
  );
}
