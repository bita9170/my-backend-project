"use client";
import React, { useState } from "react";
import RemoveBtn from "@/components/RemoveBtn";

import axios from "axios";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);

  // const handleQuestionChange = (e) => {
  //   setQuestion(e.target.value);
  // };

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !question.trim() ||
      options.filter((option) => option.trim()).length < 2
    ) {
      return;
    }

    try {
      const response = await axios.post("/api/polls", {
        question,
        options,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((option, index) => (
        <div key={index}>
          <input
            className="border border-slate-500 px-8 py-2"
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e)}
          />
          <button type="button" onClick={() => handleRemoveOption(index)}>
            <div className="flex ml-8">
              <RemoveBtn />
            </div>
          </button>
        </div>
      ))}
      <button
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        type="button"
        onClick={() => setOptions([...options, ""])}
      >
        Add Option
      </button>
      <button className="bg-green-600 font-bold text-white py-3 px-8 w-fit">
        Save Poll
      </button>
    </form>
  );
}
