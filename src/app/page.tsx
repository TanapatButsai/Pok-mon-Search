"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "@/graphql/queries";
import Search from "@/components/Search";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") || "";

  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { name: search },
    skip: !search,
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-4">Pokémon Search</h1>
        <Search />
        
        {loading && <p className="text-center mt-5">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-5">Error loading data</p>}

        {data?.pokemon ? (
          <div className="mt-6 p-6 border rounded-lg bg-gray-50 shadow-md">
            <div className="flex flex-col items-center">
              <img src={data.pokemon.image} alt={data.pokemon.name} className="w-32 h-32 mb-4" />
              <h2 className="text-2xl font-bold">{data.pokemon.name}</h2>
              <p className="text-gray-600">Types: {data.pokemon.types.join(", ")}</p>
            </div>

            <h3 className="text-xl font-semibold mt-4">Attacks</h3>
            <ul className="list-disc list-inside text-gray-700">
              {data.pokemon.attacks.fast.map((attack: any) => (
                <li key={attack.name}>
                  {attack.name} - {attack.type} ({attack.damage})
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mt-4">Evolutions</h3>
            {data.pokemon.evolutions ? (
              <div className="flex flex-wrap gap-4 mt-3">
                {data.pokemon.evolutions.map((evolution: any) => (
                  <button
                    key={evolution.id}
                    onClick={() => router.push(`/?search=${evolution.name.toLowerCase()}`)}
                    className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition"
                  >
                    {evolution.name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-2">No evolutions</p>
            )}
          </div>
        ) : (
          search && <p className="text-center text-gray-500 mt-5">No Pokémon found.</p>
        )}
      </div>
    </div>
  );
}
