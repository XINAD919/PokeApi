const baseUrl = "https://pokeapi.co/api/v2/";

const fetchPokemons = async (limit, offset) => {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  let response = await data.json();

  const result = response.results.map(async (p) => {
    const pokemon = await fetch(p.url);
    const data = await pokemon.json();
    return data;
  });

  const rersults = await Promise.all(result);
  return rersults;
};

export { fetchPokemons };
