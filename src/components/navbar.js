"use client";
import Link from "next/link";
import { Redressed } from "next/font/google";
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { TiGroupOutline } from "react-icons/ti";
import { GoTrophy } from "react-icons/go";
import { MdOutlineAnnouncement } from "react-icons/md";

export const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Navbar({ loggedUser, hackathons }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  const router = useRouter();

  const handleChange = (e) => {
    router.push(e.target.value);
  };

  return (
    <aside className="py-2 sticky top-0 flex h-screen w-[17%] space-y-4 flex-col  border-r border-gray-200">
      <div className={`px-4 text-[2rem] font-black ${redressed.className}`}>
        HackOps
      </div>
      {loggedUser.team_name
        ? null
        : !hackathons && (
            <div className="px-4 w-full">
              <Link
                href="/dashboard/hackathon/new"
                className="border border-blue-600 rounded-md px-4 py-2 w-full"
              >
                New Hackathon
              </Link>
            </div>
          )}
      {hackathons && (
        <div className="px-4">
          <select
            className="rounded-md border w-full p-2 bg-white"
            onChange={(e) => handleChange(e)}
          >
            {hackathons &&
              hackathons.map((hackathon, index) => (
                <option key={index} value={`/dashboard?id=${hackathon._id}`}>
                  {hackathon.name}
                </option>
              ))}
            <option value="/dashboard/hackathon/new">New Hackathon</option>
          </select>
        </div>
      )}
      {loggedUser.team_name
        ? null
        : hackathons && (
            <nav className="grow px-4">
              <ul className="space-y-4">
                <NavbarTab
                  to={`/dashboard?id=${
                    searchParams.get("id") ? searchParams.get("id") : params.id
                  }`}
                  title="Dashboard"
                  Icon={LuLayoutDashboard}
                  styles={
                    pathname === `/dashboard`
                      ? "bg-blue-600 text-white font-semibold"
                      : "hover:bg-sky-50"
                  }
                />
                <NavbarTab
                  to={`/dashboard/hackathon/${
                    searchParams.get("id") ? searchParams.get("id") : params.id
                  }/teams`}
                  title="Teams"
                  Icon={TiGroupOutline}
                  styles={
                    pathname ===
                    `/dashboard/hackathon/${
                      searchParams.get("id")
                        ? searchParams.get("id")
                        : params.id
                    }/teams`
                      ? "bg-blue-600 text-white font-semibold"
                      : "hover:bg-sky-50"
                  }
                />
                <NavbarTab
                  to={`/dashboard/hackathon/${
                    searchParams.get("id") ? searchParams.get("id") : params.id
                  }/rounds`}
                  title="Rounds"
                  Icon={GoTrophy}
                  styles={
                    pathname ===
                    `/dashboard/hackathon/${
                      searchParams.get("id")
                        ? searchParams.get("id")
                        : params.id
                    }/rounds`
                      ? "bg-blue-600 text-white font-semibold"
                      : "hover:bg-sky-50"
                  }
                />
                <NavbarTab
                  to={`/dashboard/hackathon/${
                    searchParams.get("id") ? searchParams.get("id") : params.id
                  }/announcements`}
                  title="Announcements"
                  Icon={MdOutlineAnnouncement}
                  styles={
                    pathname ===
                    `/dashboard/hackathon/${
                      searchParams.get("id")
                        ? searchParams.get("id")
                        : params.id
                    }/announcements`
                      ? "bg-blue-600 text-white font-semibold"
                      : "hover:bg-sky-50"
                  }
                />
              </ul>
            </nav>
          )}
      {loggedUser.team_name && (
        <nav className="grow px-4">
          <ul className="space-y-4">
            <NavbarTab
              to="/dashboard"
              title="Dashboard"
              Icon={LuLayoutDashboard}
              styles={
                pathname === `/dashboard`
                  ? "bg-blue-600 text-white font-semibold"
                  : "hover:bg-sky-50"
              }
            />

            <NavbarTab
              to={`/dashboard/hackathon/${loggedUser.hackathon}/rounds`}
              title="Rounds"
              Icon={GoTrophy}
              styles={
                pathname ===
                `/dashboard/hackathon/${loggedUser.hackathon}/rounds`
                  ? "bg-blue-600 text-white font-semibold"
                  : "hover:bg-sky-50"
              }
            />
            <NavbarTab
              to={`/dashboard/hackathon/${loggedUser.hackathon}/announcements`}
              title="Announcements"
              Icon={MdOutlineAnnouncement}
              styles={
                pathname ===
                `/dashboard/hackathon/${loggedUser.hackathon}/announcements`
                  ? "bg-blue-600 text-white font-semibold"
                  : "hover:bg-sky-50"
              }
            />
          </ul>
        </nav>
      )}
    </aside>
  );
}

function NavbarTab({ children, title, to, Icon, styles }) {
  return (
    <>
      <li>
        <Link
          href={to}
          className={`flex items-center gap-2 rounded-md p-2 ${styles}`}
        >
          <Icon size={25} />
          <span className="grow text-left text-sm">{title}</span>
        </Link>
        {children}
      </li>
    </>
  );
}
