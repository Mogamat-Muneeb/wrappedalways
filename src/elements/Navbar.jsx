import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { RxCross2 } from "react-icons/rx";
import { HiOutlineLogout } from "react-icons/hi";
import { HiDotsVertical } from "react-icons/hi";
import { ImStatsBars } from "react-icons/im";
import { BsFillPersonFill } from "react-icons/bs";

import { LoadingSpinner, LogoIcon } from "../elements/Icons";
export default function Navbar(props) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const handleClick = () => {
    setOpen(!open);
  };
  const location = useLocation();

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, [props.token]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="flex space-x-2">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  // console.log("🚀 ~ file: Navbar.jsx:27 ~ Navbar ~ userData:", userData);

  return (
    <>
      {props.token ? (
        <>
          <div
            className={`text-white h-screen md:flex hidden items-start rounded-md justify-start flex-col  relative gap-10 shadow-sm z-50 bg-white py-10 ${
              location.pathname === "/stats" && "shadow-none"
            }`}
          >
            <div className="flex flex-col w-full gap-10 ">
              <Link
                to="/"
                className="flex items-start justify-start px-4  text-[12px] font-bold "
              >
                <LogoIcon />
              </Link>

              <div className="flex flex-col items-start justify-center gap-10 px-4 text-left ">
                <Link
                  to="/"
                  className={`font-medium flex gap-1 items-center  ${
                    location.pathname === "/" && "text-[#22c55e]"
                  }`}
                >
                  <ImStatsBars
                    className={`${
                      location.pathname === "/" && "fill-[#22c55e]"
                    }`}
                  />
                  Stats
                </Link>
                <Link
                  to="account"
                  className={`font-medium flex items-center gap-1  ${
                    location.pathname === "/account" && "text-[#22c55e]"
                  }`}
                >
                  <BsFillPersonFill
                    className={`${
                      location.pathname === "/account" && "fill-[#22c55e]"
                    }`}
                  />
                  Account
                </Link>
              </div>
                <div className="absolute px-2 bottom-12">
                  <div className="flex items-center gap-1">
                    <img
                      src={userData.images[0]?.url}
                      alt="Profile"
                      className="w-9 h-9 shadow border-white rounded-full border-[3px] bg-[url('https://i.postimg.cc/MGrqp8xj/Group-5.jpg)] "
                    />
                    <Link to="account" className="text-[14px] font-medium">
                      {userData.display_name}
                    </Link>
                  </div>
                  <button
                    onClick={props.logout}
                    className="w-full py-2 rounded bg-[#EFEFEF] font-medium text-[14px] mt-4 flex items-center gap-1 flex-col"
                  >
                    <HiOutlineLogout className="text-[17px]" /> Log Out
                  </button>
                </div>

            </div>
          </div>
        </>
      ) : null}
      {props.token ? (
        <>
          <div className="fixed top-0 left-0 right-0 z-10 flex items-center h-16 px-3 text-white bg-gray-100 md:hidden">
            <div className="flex items-center justify-between w-full ">
              <Link to="/" className="flex items-center justify-start w-full">
                <LogoIcon />
              </Link>
              {userData.images[0]?.url ? (
                <img
                  src={userData.images[0]?.url}
                  alt="Profile"
                  className="w-10 h-10 shadow border-white rounded-full border-[3px] bg-[url('https://i.postimg.cc/MGrqp8xj/Group-5.jpg)] "
                />
              ) : null}
              <div className="flex items-center justify-end w-full">
                <HiDotsVertical
                  className="font-bold text-[25px]"
                  onClick={handleClick}
                />
              </div>
            </div>
          </div>
          <div
            className={`${
              open
                ? " transition-all duration-500 w-10  bg-white opacity-100 shadow  "
                : " -translate-y-full  transition-all duration-700 w-10 bg-white opacity-10"
            } fixed  z-50   m-2  right-0 w-32  top-0 rounded-md shadow-2xl `}
          >
            <div className="flex flex-col gap-4 p-2 ">
              <div className="flex justify-end">
                <MdOutlineKeyboardBackspace
                  className="font-bold text-[25px]"
                  onClick={handleClick}
                />
              </div>
              <Link
                to="/"
                className={`font-medium  ${
                  location.pathname === "/" && "text-[#22c55e]"
                }`}
                onClick={handleClick}
              >
                Stats
              </Link>
              <Link
                to="account"
                className={`font-medium  ${
                  location.pathname === "/account" && "text-[#22c55e]"
                }`}
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
