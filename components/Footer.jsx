import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <div className='md:h-16 w-full bg-footer text-white grid grid-cols-3 gap-4'>
      <div className=''></div>
      <div className='place-self-center'>
        <span className='text-white'>
          ❮❯ by{" "}
          <a
            className='text-white'
            href='https://github.com/XINAD919/'
            target='__blank'
          >
            Daniel Castaño{" "}
          </a>
        </span>
        <span className='text-white'>{date}</span>
      </div>
      <div className=''></div>
    </div>
  );
};

export default Footer;
