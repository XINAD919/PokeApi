import React, { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "@components/components/Layout";
import Pagination from "../../components/Pagination";
import PokemonType from "../../components/PokemonType";
const Index = (props) => {
  const pokemon = props.data;
  const { next, prev } = props.pagination;
  const { specieInfo, evolutionChain } = props.specieInfo;
  console.log("🚀 ~ Index ~ evolutionChain:", evolutionChain);

  const formattedSizes = () => {
    const weight = pokemon.weight.toString();
    const height = pokemon.height.toString();

    let weightParte1 = weight.slice(0, -1);

    let weightParte2 = weight.slice(-1);

    let heightParte1 = height.slice(0, -1);

    let heightParte2 = height.slice(-1);

    let weightFormatted = `${weightParte1},${weightParte2}`;
    let heightFormatted = `${
      heightParte1 !== "" ? heightParte1 : "0"
    },${heightParte2}`;

    return { weightFormatted, heightFormatted };
  };

  const { weightFormatted, heightFormatted, weight, height } = formattedSizes();

  return (
    <Layout>
      <Pagination nextLink={next} prevLink={prev} />
      <div className='flex flex-col justify-center items-center'>
        <Image
          alt={pokemon.name + "Image"}
          src={pokemon.sprites.other["official-artwork"].front_default}
          width={250}
          height={250}
        />
        <h1 className='font-normal capitalize text-4xl'>
          {pokemon.name}{" "}
          <span className='text-slate-400'>
            N.°
            {pokemon.id < 10
              ? "00" + pokemon.id
              : (pokemon.id >= 10) & (pokemon.id < 100)
              ? "0" + pokemon.id
              : pokemon.id}
          </span>
        </h1>
        <div className='flex gap-4 uppercase'>
          <span className='flex'>
            weight: {weightFormatted + " " || weight + " "}{" "}
            <p className='lowercase'>kg</p>
          </span>
          <span className='flex'>
            height: {heightFormatted + " " || height + " "}
            <p className='lowercase'>m</p>
          </span>
          <span className='flex '>
            type:{" "}
            {pokemon.types.length > 1
              ? pokemon?.types[0]?.type.name +
                "/" +
                pokemon?.types[1]?.type.name
              : pokemon?.types[0]?.type.name}
          </span>
        </div>
      </div>
      <div className=''>
        <div className=''>
          <h2>seed pokemon</h2>
          <div className=''>
            {specieInfo?.flavor_text_entries[8].flavor_text}
          </div>
        </div>
        <div className=''>
          <h2 className='text-center'>Evolutions</h2>
          <div className='grid grid-flow-col place-items-center'>
            {evolutionChain.map((e) => (
              <div key={e.id} className=''>
                <Image
                  alt={`${e.name} image`}
                  src={e.sprites.other["official-artwork"].front_default}
                  width={120}
                  height={120}
                />
                <h2 className='text-center font-normal capitalize text-base'>
                  {e.name}{" "}
                  <span className='text-slate-400'>
                    N.°
                    {e.id < 10
                      ? "00" + e.id
                      : (e.id >= 10) & (e.id < 100)
                      ? "0" + e.id
                      : e.id}
                  </span>
                </h2>
                <PokemonType types={e.types} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;

  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.id[0]}`);
  let response = await data.json();
  const getNext = async () => {
    try {
      const next = parseInt(response.id + 1, 10);
      const nextPokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${next}`
      );
      const { name } = await nextPokemon.json();

      return name;
    } catch (error) {
      console.error(error);
    }
  };

  const getPrev = async () => {
    try {
      const prev = parseInt(response.id - 1, 10);
      if (prev !== 0) {
        const prevPokemon = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${prev}`
        );
        const { name } = await prevPokemon.json();

        return name;
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  };

  const getSpecieInfo = async () => {
    const url = response.species.url;
    try {
      const data = await fetch(url);
      const { evolution_chain, flavor_text_entries } = await data.json();
      return { evolution_chain, flavor_text_entries };
    } catch (error) {
      console.error(error);
    }
  };

  const getEvolutionChain = async () => {
    const { evolution_chain } = specieInfo;
    try {
      const data = await fetch(evolution_chain.url);
      const { chain } = await data.json();

      // evoluciones como las de eeve
      if (chain.evolves_to.length > 1) {
        const first = chain.species.name;
        const evolutions = [first];
        chain.evolves_to.forEach((pokemon) => {
          evolutions.push(pokemon.species.name);
        });

        const test = evolutions.map((evolutions) => {
          console.log(evolutions);
        });

        const promise = evolutions.map(async (p) => {
          const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${p}`);
          const data = await pokemon.json();
          const { sprites, id, name, types } = data;
          return { sprites, id, name, types };
        });
        const results = await Promise.all(promise);
        return results;
      }

      // evoluciones normales
      if (chain.evolves_to.length > 0) {
        const first = chain.species.name;
        const second = chain.evolves_to[0].species.name;
        const thirth = chain.evolves_to[0]?.evolves_to[0]?.species.name;

        const evolutions = [];
        evolutions.push(first);
        second !== undefined && evolutions.push(second);
        thirth !== undefined && evolutions.push(thirth);

        const promise = evolutions.map(async (p) => {
          const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${p}`);
          const data = await pokemon.json();
          const { sprites, id, name, types } = data;
          return { sprites, id, name, types };
        });
        const results = await Promise.all(promise);
        return results;
      }
      const initialform = async () => {
        const pokemon = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${chain.species.name}`
        );
        const dataPokemon = await pokemon.json();
        const { sprites, id, name, types } = dataPokemon;
        return { sprites, id, name, types };
      };
      return initialform();
    } catch (error) {
      console.error(error);
    }
  };
  const specieInfo = await getSpecieInfo();
  const evolutionChain = await getEvolutionChain();
  const prev = await getPrev();
  const next = await getNext();
  return {
    props: {
      data: response,
      pagination: { prev, next },
      specieInfo: { specieInfo, evolutionChain },
    },
  };
};
