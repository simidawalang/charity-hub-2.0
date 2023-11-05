import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { navlinks } from "../constants";
import { logo, sun } from "../assets";

const Icon = ({ styles, img, link, disabled }) => {
  const { pathname } = useLocation();

  return (
    <Link
      className={`w-[46px] h-[46px] rounded-[10px] ${
        pathname === link && "bg-[#2c2f32]"
      } flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles}`}
      to={link}
    >
      <img
        src={img}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${pathname !== link && "grayscale"}`}
      />
    </Link>
  );
};

const Sidebar = () => {
  return (
    <nav className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Icon
        styles="w-[50px] h-[50px] bg-[#2c2f32]"
        img={logo}
        link="/"
        isActive
      />

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon key={link.name} {...link} />
          ))}
        </div>

        <Icon styles="shadow-secondary bg-[#1c1c24] " img={sun} />
      </div>
    </nav>
  );
};

export default Sidebar;
