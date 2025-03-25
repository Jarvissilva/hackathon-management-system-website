import Link from "next/link";
import { Redressed } from "next/font/google";

export const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Layout({ children }) {
  return (
    <main className="h-screen bg-sky-50">
      <header className="flex justify-center bg-white items-center px-[clamp(1rem,5vw,5rem)] py-8 border">
        <Link
          className={`text-[clamp(2.5rem,5vw,3rem)] font-black ${redressed.className} leading-none`}
          href="/"
        >
          HackOps
        </Link>
      </header>
      <div className="bg-sky-50 flex flex-col py-24 justify-center items-center">
        <div className="bg-white p-4 rounded-md border">{children}</div>
      </div>
    </main>
  );
}
