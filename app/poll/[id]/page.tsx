"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

interface Option {
  name: String;
  count: number;
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
    const options = poll.options;

    await axios
      .put(`/api/polls/${id}`, {
        question,
        options,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  useEffect(() => {
    getPoll();
  }, []);

  return (
    <div>
      {/* <h1>{id}</h1> */}
      <h1 className="text-2xl">{poll?.question}</h1>
      <ul className="mx-4">
        {poll?.options.map((item: Option, index) => (
          <li key={index}>
            <input
              type="radio"
              name={id}
              className="mx-2"
              onChange={() => setSelectedOption(item)}
            />
            {item.name}
          </li>
        ))}
      </ul>
      <button
        className="bg-sky-500 text-white py-2 px-4 text-bold hover:bg-sky-800 mt-4"
        onClick={(e) => handleVote(e.target)}
      >
        Vote
      </button>
    </div>
  );
}

export default Poll;
