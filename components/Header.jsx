import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className='h-12 w-full flex px-4 py-2 items-center justify-between bg-secondary text-white'>
      <div className=''>
        <Link href='/'>
          <Image
            src={"/mypokedex.png"}
            alt='my-pokedex.png'
            width={120}
            height={20}
            priority
          />
        </Link>
      </div>
      {/* <div className=''>otros links</div> */}
    </div>
  );
};

export default Header;
