import Image from "next/image";
import Link from "next/link";

const PokeCard = ({ pokemon }) => {
  return (
    <div className='grid grid-flow-row grid-cols-2 md:grid-cols-4 xl:grid-cols-4 place-items-center gap-4'>
      {pokemon &&
        pokemon.map((p) => (
          <Link key={p.id} href={`/pokemon/${p.name}`}>
            <div className='rounded-md shadow-md px-4 py-2'>
              <span className='text-xl text-slate-400'>
                #
                {p.id < 10
                  ? "00" + p.id
                  : (p.id >= 10) & (p.id < 100)
                  ? "0" + p.id
                  : p.id}
              </span>
              <div className=''>
                <Image
                  src={p.sprites.other["official-artwork"].front_default}
                  alt={p.name + " image"}
                  width={200}
                  height={200}
                  priority
                />
              </div>
              <div className='flex flex-col capitalize py-2 gap-2'>
                <p className='text-xl'>{p.name}</p>
                <div className={`flex gap-3 text-sm `}>
                  {p.types.map((types) => (
                    <p
                      key={types.slot}
                      className={`rounded-md bg-${types.type.name} px-3 `}
                    >
                      {types.type.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default PokeCard;
