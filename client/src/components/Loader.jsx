import React from "react";
import { loader } from "../assets";

const Loader = () => {
  return (
    <div className="z-10 fixed inset-0 h-screen bg-[rgba(0,0,0,0.75)] flex items-center justify-center gap-4">
      <img src={loader} alt="loader" className="h-[100px] w-[100px] object-contain"/>
    </div>
  );
};

export default Loader;
