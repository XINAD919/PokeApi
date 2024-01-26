export default async function getPokemon(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon`);
      let response = await data.json();
      const promise = response.results.map(async (p) => {
        const pokemon = await fetch(p.url);
        const data = await pokemon.json();
        const { id, name, types, sprites } = data;
        return { id, name, types, sprites };
      });
      const results = await Promise.all(promise);
      res.status(200).json({ data: results, message: "OK" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error, message: "not OK" });
    }
  } else {
    res.json({ message: "method not allowed" });
  }
}
