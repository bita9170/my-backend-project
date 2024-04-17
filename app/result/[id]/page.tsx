"use client";

import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

interface Params {
  params: {
    id: string;
  };
}

interface Option {
  name: string;
  count: number;
  _id?: string;
}

interface Poll {
  question: string;
  options: Option[];
}

function Result({ params }: Params) {
  const { id } = params;
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [poll, setPoll] = useState<Poll>();

  const getPoll = async () => {
    try {
      const response = await axios.get(`/api/polls/${id}`);
      setPoll(response.data.poll);
    } catch (error) {
      console.error("Error fetching poll:", error);
    }
  };

  useEffect(() => {
    getPoll();
  }, []);

  useEffect(() => {
    if (!poll) return;

    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const data = {
          labels: poll.options.map((option) => option.name),
          datasets: [
            {
              label: "Votes",
              data: poll.options.map((option) => option.count),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };

        const newChartInstance = new Chart(ctx, {
          type: "bar",
          data,
          options: {
            // indexAxis: "y",
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        chartInstanceRef.current = newChartInstance;
      }
    }

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [poll]);

  return (
    <div className="max-w-2xl m-auto flex flex-col gap-4">
      <h1 className="text-bold text-2xl text-center">{poll?.question}</h1>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default Result;
