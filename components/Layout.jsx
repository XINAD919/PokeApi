import React, { FC, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className='px-6 py-4 min-h-screen z-auto'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
