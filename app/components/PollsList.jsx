import React from "react";
import Link from "next/link";

export default function PollsList() {
  return (
    <>
      <div className="text-center ">
          <h2 className="font-bold text-2xl items-center mb-10">
            Try Outgrow's poll creator for free.
          </h2>
        <div className="p-4 border-slate-300 my-3 flex justify-between gap-5 items-center">
          <div>
            <h1 className="font-bold text-2xl">
              Outgrow's Online Poll Maker
            </h1>
            <p>Fast, Easy, and interactiv</p>
          </div>
        </div>
        <div>
          <Link
            className=" p-2 bg-pink-600 font-bold text-white py-3 px-6 w-fit mt-5"
            href={"/createPoll"}
          >
            CREAT A POLL FOR FREE
          </Link>
        </div>
      </div>
    </>
  );
}
