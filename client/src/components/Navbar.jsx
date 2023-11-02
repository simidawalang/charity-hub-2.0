import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "./";
import { search, logo, menu, thirdweb } from "../assets";
import { navlinks } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { pathname } = useLocation();

  const address = "0xabcd...";

  return (
    <nav className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="flex g:flex-1 max-w-[458px] py-2 pl-4 pr-2 h-[50px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="search"
          className="w-full bg-transparent outline-none font-normal text-white text-[14px] placeholder:text=[#4b5264] pr-2"
          placeholder="Search for campaign"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img
            className="h-[15px] w-[15px] object-contain"
            src={search}
            alt="search"
          />
        </div>
      </div>
      <div className="sm:flex hidden justify-end gap-4">
        <Button
          type="button"
          className={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          title={address ? "Create Campaign" : "Connect Wallet"}
          onClick={() => {
            if (address) {
              navigate("/create-campaign");
            } else {
              ("connect()");
            }
          }}
        />
      </div>

      {/* For small screens */}
      <div className="sm:hidden flex justify-between items-center relative">
        <span>CH</span>
        <img
          src={menu}
          className="w-[32px] h-[32px] object-contain cursor-pointer"
          alt="menu"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />
        <div
          className={`absolute top-[-60px]right-0 left-0 z-10 w-full bg-[#1c1c24] shadow-secondary py-4 ${
            toggleDrawer ? "translate-y-[240px]" : "-translate-y-[100vh]"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link, i) => (
              <li
                key={i}
                className={`flex  ${pathname === link.link && "bg-[#3a3a43]"}`}
                onClick={() => setToggleDrawer(false)}
              >
                <Link className="p-4 w-full flex items-center" to={link.link}>
                  <img
                    src={link.img}
                    className={`w-[20px] ${
                      pathname === link.link ? "grayscale-0" : "grayscale"
                    }`}
                    alt={link.name}
                  />
                  <span
                    className={`ml-[20px] font-semibold text-[14px] ${
                      pathname === link.link
                        ? "text-[#1dc071]"
                        : "text-[#808191]"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <Button
              type="button"
              className={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              title={address ? "Create Campaign" : "Connect Wallet"}
              onClick={() => {
                if (address) {
                  navigate("/create-campaign");
                } else {
                  ("connect()");
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
