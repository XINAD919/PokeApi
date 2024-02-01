function PokemonType({ types: p }) {
  return (
    <div className={`flex gap-3 text-sm `}>
      {p.map((types, index) => (
        <p key={index} className={`rounded-md bg-${types.type.name} px-3 `}>
          {types.type.name}
        </p>
      ))}
    </div>
  );
}
export default PokemonType;
