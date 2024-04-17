"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { IoShareOutline } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";

interface Params {
  params: {
    id: string;
  };
}

interface Option {
  name: String;
  count: number;
  _id?: String;
}
interface Poll {
  question: String;
  options: Option[];
}

function Poll({ params }: Params) {
  const { id } = params;
  const [poll, setPoll] = useState<Poll>();
  const [selectedOption, setSelectedOption] = useState<Option>();
  const router = useRouter();
  const [cookies, setCookie] = useCookies([`poll_${id}_voted`]);
  const { toast } = useToast();

  // Check if user has already voted
  if (cookies[`poll_${id}_voted`]) {
    router.push(`/result/${id}`);
  }

  const getPoll = async () => {
    axios.get(`/api/polls/${id}`).then((response) => {
      setPoll(response.data.poll);
    });
  };

  const handleVote = async (button: any) => {
    if (!selectedOption) {
      return;
    }

    if (!poll) {
      return;
    }

    button.disabled = true;

    poll.options.map((option: Option) => {
      if (option.name === selectedOption.name) {
        option.count += 1;
      }
    });

    const question = poll.question;
    const options: Option[] = poll.options.map(({ _id, ...rest }) => rest);

    await axios
      .put(`/api/polls/${id}`, {
        question,
        options,
      })
      .then((response) => {
        // Set cookie to mark that the user has voted
        setCookie(`poll_${id}_voted`, "true", { path: "/", maxAge: 604800 }); // Expires in 7 day
        router.push(`/result/${id}`);
      });
  };

  useEffect(() => {
    getPoll();
  }, []);

  const copyPollLink = () => {
    // Copy the polls link in clipboard
    navigator.clipboard.writeText(window.location.href);

    toast({
      title: "The polls link was copied!",
      description: "Now you can paste it everywhere",
    });
  };

  return (
    <div className="max-w-2xl m-auto bg-sky-200 py-8 px-4 rounded-lg relative">
      <div className="absolute right-0 top-0 rounded-full hover:bg-sky-400 p-2 m-2 cursor-pointer">
        <IoShareOutline
          size={24}
          onClick={() => copyPollLink()}
          title="Share Poll"
        />
      </div>
      <h1 className="text-bold text-2xl">{poll?.question}</h1>
      <ul className="mx-4 my-2 text-lg">
        {poll?.options.map((item: Option, index) => (
          <li key={index}>
            <input
              type="radio"
              name={id}
              id={index.toString()}
              className="mx-2"
              onChange={() => setSelectedOption(item)}
            />
            <label htmlFor={index.toString()}>{item.name}</label>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 items-center">
        <button
          className="bg-sky-950 text-white py-2 px-6 text-bold hover:bg-sky-700 mt-4 disabled:bg-sky-300 rounded-lg"
          onClick={(e) => handleVote(e.target)}
        >
          Vote
        </button>
        <Link href={`/result/${id}`} className="hover:underline">
          View Result
        </Link>
      </div>
    </div>
  );
}

export default Poll;
