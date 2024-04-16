import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center bg-slate-800 px-8 py-3 justify-between">
      <Link className="text-white font-bold" href={"/"}>
        Typeform{" "}
      </Link>
      <Link className="bg-white p-2" href={"/createPoll"}>
        Create a Poll
      </Link>
    </nav>
  );
}
