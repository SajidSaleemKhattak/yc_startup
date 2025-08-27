import Navbar from "@/components/Navbar";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
    </>
  );
};

export default layout;
