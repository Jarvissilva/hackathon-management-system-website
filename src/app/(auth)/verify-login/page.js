"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyLogin } from "actions/auth";

export default function Page({ searchParams }) {
  const [message, setMessage] = useState("Verifying...");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await verifyLogin(searchParams.token, searchParams.type);
      setMessage(res.message);
      if (res.success) return router.push(searchParams.redirect);
      return router.push("/");
    })();
  }, [searchParams.token]);

  return (
    <div className="p-[clamp(1.5rem,5vw,2rem)]">
      <p className="text-center text-2xl font-semibold">{message}</p>
    </div>
  );
}
