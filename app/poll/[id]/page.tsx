"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Params {
  params: {
    id: string;
  };
}

interface Poll {
  question: String;
  options: String[];
}

function Poll({ params }: Params) {
  const { id } = params;
  const [poll, setPoll] = useState<Poll>();

  const getPoll = async () => {
    axios.get(`/api/polls/${id}`).then((response) => {
      setPoll(response.data.poll);
      console.log(response);
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
        {poll?.options.map((item: String, index) => (
          <li key={index}>
            <input type="radio" name={id} className="mx-2" />
            {item}
          </li>
        ))}
      </ul>
      <button className="bg-sky-500 text-white py-2 px-4 text-bold hover:bg-sky-800 mt-4">
        Vote
      </button>
    </div>
  );
}

export default Poll;
