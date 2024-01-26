import React, { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "@components/components/Layout";
import Pagination from "../../components/Pagination";

const Index = (props) => {
  const pokemon = props.data;
  console.log("🚀 ~ file: [...id].jsx:8 ~ Index ~ pokemon:", pokemon);
  const { next, prev } = props.pagination;

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
            weight: {weightFormatted || weight + " "}{" "}
            <p className='lowercase'>kg</p>
          </span>
          <span className='flex'>
            height: {heightFormatted || height + " "}{" "}
            <p className='lowercase'>m</p>
          </span>
          <span className='flex '>
            type:
            {pokemon.types.map((types) => (
              <p key={types.slot}>{types.type.name}</p>
            ))}
          </span>
        </div>
      </div>
      <div className=''></div>
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

  const prev = await getPrev();
  const next = await getNext();
  return {
    props: {
      data: response,
      pagination: { prev, next },
    },
  };
};
