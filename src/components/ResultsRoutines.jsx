"use client";
import ResultCard from "@/components/ResultCard";

import { useEffect, useState } from "react";

async function loadResults() {
  try {
    const res = await fetch(`http://localhost:3000/api/routine`);
    if (!res.ok) {
      throw new Error("Failed to fetch results");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error loading results:", error);
    return [];
  }
}
const ResultPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadResults();
      setResults(data);
    };

    fetchData();
  }, []);

  return (
    <main className="md:flex md:flex-col text-center  mt-20">
      <h1 className="text-5xl p-4 mb-6 text-center">Hi</h1>
      <div className="bg-appOrange text-3xl md:mx-auto font-extrabold p-6">
        <h2 className="mb-4">Check your</h2>
        <h2 className="text-gray-900">History</h2>
      </div>

      <ul className="text-orange-600 mt-20 text-bold">
        {results.map((result) => (
          <li className=" hover:bg-orange-400 md:text-2xl" key={result.id}>
            <ResultCard result={result} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ResultPage;
