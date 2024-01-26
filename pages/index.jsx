import Layout from "@components/components/Layout";
import PokeCard from "@components/components/PokeCard";
import { useEffect, useState } from "react";
import Loader from "@components/components/Loader";

export default function Home() {
  const [pokemon, setPokemon] = useState();
  const [limit, setLimit] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const getMorePokemon = () => {
    setLimit(limit + 50);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
        );
        let response = await data.json();
        const promise = response.results.map(async (p) => {
          const pokemon = await fetch(p.url);
          const data = await pokemon.json();
          const { id, name, types, sprites } = data;
          return { id, name, types, sprites };
        });
        const results = await Promise.all(promise);
        setPokemon(results);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchPokemon();
  }, [limit]);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PokeCard pokemon={pokemon} />
          <button
            className='block m-auto py-2 px-2 rounded-md border mt-4 bg-[#e3340deb] text-white font-light'
            onClick={() => getMorePokemon()}
          >
            Load more pokemon
          </button>
        </>
      )}
    </Layout>
  );
}
