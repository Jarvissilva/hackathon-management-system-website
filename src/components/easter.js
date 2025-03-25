"use client";
import Image from "next/image";
import myGif from "../../public/clip.gif";
import { P } from "./utilities";
import { useState, useEffect } from "react";

export default function Easter() {
  const [display, setDisplay] = useState(false);
  const [showMoney, setShowMoney] = useState(false);

  useEffect(() => {
    if (display) {
      // Show money after 2 seconds
      const moneyTimer = setTimeout(() => {
        setShowMoney(true);
      }, 3000);

      // Hide everything after 4 seconds
      const hideTimer = setTimeout(() => {
        setDisplay(false);
        setShowMoney(false);
      }, 6000);

      return () => {
        clearTimeout(moneyTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [display]);

  return (
    <>
      <button
        className="px-4 py-2 bg-pink-700 rounded-md text-white"
        onClick={() => setDisplay(true)}
      >
        View Prizes
      </button>
      {display && (
        <div className="bg-red-500 border absolute w-full flex justify-center items-center top-0 left-0">
          <Image
            src={myGif}
            alt="my gif"
            height={600}
            width={600}
            className="absolute top-20"
          />
          {showMoney && (
            <P styles="absolute top-80 w-full text-center left-0 font-semibold text-black text-6xl">
              RS 35,0000
            </P>
          )}
        </div>
      )}
    </>
  );
}
