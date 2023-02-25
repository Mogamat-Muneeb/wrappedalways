import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { HiDotsVertical } from "react-icons/hi";

import { LogoIcon } from "../elements/Icons";
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
        <div class="flex space-x-2">
          <div aria-label="Loading..." role="status">
            <svg class="h-7 w-7 animate-spin" viewBox="3 3 18 18">
              <path
                class="fill-[#22c55e]"
                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
              ></path>
              <path
                class="fill-[#f3f4f6]"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {props.token ? (
        <>
          <div
            className={`text-white h-screen md:flex hidden items-start justify-start flex-col gap-10 shadow-sm z-50 bg-white py-10 ${
              location.pathname === "/stats" && "shadow-none"
            }`}
          >
            <div className="flex flex-col w-full gap-10 ">

                <Link to="/" className="flex items-start justify-start ">
                  <LogoIcon/>
                </Link>

              <div className="flex flex-col gap-10 px-2 ">
                <Link to="/" className={`font-semibold  ${location.pathname === "/" && "text-[#22c55e]"}`}>
                Stats
              </Link>
                <Link
                  to="account"
                  className={`font-semibold  ${
                    location.pathname === "/account" && "text-[#22c55e]"
                  }`}
                >
                  Account
                </Link>
              </div>
              <div className="fixed flex flex-col items-center px-2 bottom-10">
              <img
                    src={userData.images[0]?.url}
                    alt="Profile"
                    className="w-10 h-10 shadow border-white rounded-full border-[3px] bg-[url('https://i.postimg.cc/MGrqp8xj/Group-5.jpg)] "
                  />
                <button onClick={props.logout}>Logout</button>
              </div>
            </div>
          </div>
          {/* {location.pathname === "/stats" && (
            <div className="md:flex  hidden justify-between text-white w-full h-full pt-32 pb-20  bg-[#f3f4f6] shadow-xl items-center">
              <div className="max-w-[1285px] mx-auto flex justify-between w-full">
                <div className="flex items-end w-full gap-10 ">
                  <img
                    src={userData.images[0]?.url}
                    alt="Profile"
                    className="w-40 h-40 border-white rounded-full border-[3px] bg-[url('https://i.postimg.cc/MGrqp8xj/Group-5.jpg)] "
                  />
                  <img src="https://i.postimg.cc/MGrqp8xj/Group-5.jpg" alt="" />
                  <p className="text-3xl font-extrabold bg-transparent">
                    {userData.display_name}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-start ">
                  <div className="flex gap-2 hover:text-[#22c55e] font-bold w-full bg-transparent">
                    <Link
                      target="_blank"
                      className="hover:text-[#22c55e] flex gap-2 bg-transparent "
                      to={`https://open.spotify.com/user/${userData.id}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="w-6 h-6 fill-current bg-transparent"
                      >
                        <g>
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path
                            fill-rule="nonzero"
                            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.55 2 12 2zm3.75 14.65c-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85-.2.3-.55.4-.85.2zm1-2.7c-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.2 1s-.7.5-1.05.25zM6.3 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25C14.7 9 9.35 8.8 6.3 9.75z"
                          ></path>
                        </g>
                      </svg>
                      Logo spotify open in Spotiy
                    </Link>
                  </div>
                  <div className="bg-transparent">
                    <p className="bg-transparent">
                      {userData.followers.total} Followers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </>
      ) : null}
      {props.token ? (
        <>
          <div className="sticky top-0 z-10 flex items-center h-16 px-3 text-white bg-gray-100 md:hidden">
            <div className="flex items-center justify-between w-full ">
              <Link to="/" className="flex items-center justify-start w-full">
              <LogoIcon/>
              </Link>
              <img
                    src={userData.images[0]?.url}
                    alt="Profile"
                    className="w-10 h-10 shadow border-white rounded-full border-[3px] bg-[url('https://i.postimg.cc/MGrqp8xj/Group-5.jpg)] "
                  />
              <div
                className="flex items-center justify-end w-full"
              >
                <HiDotsVertical className="font-bold text-[25px]"   onClick={handleClick} />
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
              <Link to="/"
                className={`font-semibold  ${
                  location.pathname === "/" && "text-[#22c55e]"
                }`}
               onClick={handleClick}>
                Stats
              </Link>
              <Link
                to="account"
                className={`font-semibold  ${
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
