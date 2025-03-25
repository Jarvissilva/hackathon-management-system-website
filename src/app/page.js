import { getLoggedUser } from "actions/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Redressed } from "next/font/google";

export const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function Page() {
  const authRes = await getLoggedUser();

  if (authRes.success) redirect("/dashboard");

  console.log(authRes);

  return (
    <>
      <header className="flex justify-between items-center px-[clamp(1rem,5vw,5rem)] py-4 border">
        <Link
          className={`text-[clamp(2.5rem,5vw,3rem)] font-black ${redressed.className} leading-none`}
          href="/"
        >
          HackOps
        </Link>
        {authRes.success ? (
          <button
            onClick={logoutTeacher}
            className="bg-blue-500 text-white font-medium px-[clamp(1.25rem,5vw,1.5rem)] py-[clamp(0.5rem,5vw,.6rem)] rounded-md hover:bg-blue-700"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-blue-500 text-white font-medium px-[clamp(1.25rem,5vw,1.5rem)] py-[clamp(0.5rem,5vw,.6rem)] rounded-md hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </header>
      <main className="flex flex-col justify-center items-center gap-2 px-[clamp(1.25rem,6vw,6rem)] py-24 lg:px-[clamp(6rem,35vw,33rem)]">
        <h1 className="text-[clamp(2.5rem,5vw,3rem)] text-center font-black capitalize leading-tight">
          Easily Manage Your Hackathon
        </h1>
        <div className="text-center space-y-2">
          <p className="text-lg">Are you a Coordinator?</p>
          <div className="space-x-4">
            <>
              <Link
                href="/register"
                className="bg-blue-500 text-white px-5 py-3 font-semibold rounded-md shadow-md hover:bg-blue-600 inline-block"
              >
                Create a hackathon
              </Link>
              <Link
                href="/login"
                className="border border-blue-500 px-5 py-3 font-semibold rounded-md shadow-md hover:border-black inline-block"
              >
                Login
              </Link>
            </>
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg">Are you a participant?</p>
          <Link
            href="/hackathon-login"
            className="bg-white text-black px-5 py-3 font-semibold border border-blue-500 rounded-md shadow-md hover:border-black inline-block"
          >
            Login to hackathon
          </Link>
        </div>
      </main>
    </>
  );
}
