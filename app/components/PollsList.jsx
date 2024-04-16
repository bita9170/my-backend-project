import React from "react";
import Link from "next/link";

export default function PollsList() {
  return (
    <>
      <div className="p-4 border-slate-300 my-3 flex justify-between gap-5 items-start">
        <div>
          <h1 className="font-bold text-2xl items-center">
            Outgrow's Online Poll Maker
          </h1>
          <p>Fast, Easy, and interactiv</p>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-2xl items-center mb-10">
          Try Outgrow's poll creator for free.
        </h2>

        <Link
          className=" p-2 bg-pink-600 font-bold text-white py-3 px-6 w-fit "
          href={"/createPoll"}
        >
          CREAT A POLL FOR FREE
        </Link>
      </div>
    </>
  );
}
