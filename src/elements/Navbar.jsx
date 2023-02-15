import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineSegment } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
export default function Navbar(props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const location = useLocation();

  console.log(location.pathname, "location")
  return (
    <>
      {props.token ? (
        <div className="text-black h-16  md:flex hidden items-center  fixed left-0 right-0 top-0 z-10 bg-[#171a20] ">
          <div className="max-w-[1285px] mx-auto flex items-center w-full bg-[#171a20]">
            <div className="w-full bg-[#171a20] ">
              <Link to="/" className="bg-[#171a20] text-[#14c4e1]">
                LOGO
              </Link>
            </div>
            <div className="flex items-center justify-end w-full gap-4 bg-[#171a20]">
              <input type="search" placeholder="Search "  className="p-1 pl-3 cursor-pointer rounded-3xl focus:outline-none focus:ring-0"/>
              <Link to="stats" className={`font-semibold bg-[#171a20] ${location.pathname === "/stats" && "text-[#14c4e1]"}`}>
                Stats
              </Link>
              <Link to="account" className={`font-semibold bg-[#171a20] ${location.pathname === "/account" && "text-[#14c4e1]"}`}>
                Account
              </Link>
              <button onClick={props.logout}>Logout</button>
            </div>
          </div>
        </div>
      ) : null}
      {props.token ? (
        <>
          <div className="sticky top-0 z-10 flex items-center h-16 px-4 text-white md:hidden">
            <div className="flex items-center justify-between w-full ">
              <Link to="/" className="flex items-center justify-start w-full">
                LOGO
              </Link>
              <div
                className="flex items-center justify-end w-full"
                onClick={handleClick}
              >
                <MdOutlineSegment className="font-bold text-[25px]" />
              </div>
            </div>
          </div>
          <div
            className={`${
              open
                ? " transition-all duration-500 bg-white"
                : " translate-x-full  transition-all duration-500 bg-[#FFFFFF]"
            } fixed   overflow-y-auto z-50  lg:hidden w-full re-d overflow-x-hidden top-0`}
          >
            <div className="flex items-center justify-between w-full h-16 px-2  border-b border-[#bbbbbb]">
              <Link
                to="/"
                className="flex items-center justify-start w-full text-[#1DB954] "
                onClick={handleClick}
              >
                LOGO
              </Link>
              <div
                className="flex items-center justify-end w-full"
                onClick={handleClick}
              >
                <RxCross2
                  className="font-bold text-[25px]"
                  onClick={handleClick}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 px-2 pt-4">
              <Link to="stats" className="font-semibold " onClick={handleClick}>
                Stats
              </Link>
              <Link
                to="account"
                className="font-semibold "
                onClick={handleClick}
              >
                Account
              </Link>
              <div>
                <button onClick={props.logout}>Logout</button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
