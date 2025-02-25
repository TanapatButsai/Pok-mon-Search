"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/?search=${search.trim().toLowerCase()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center justify-center gap-2 mt-5">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a Pokémon..."
        className="w-80 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <button type="submit" className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition">
        Search
      </button>
    </form>
  );
};

export default Search;
