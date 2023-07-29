import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../elements/Icons";

export default function Account(props) {
  const [userData, setUserData] = useState(null);
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

  return (
    <div className="md:pt-10 pt-16 items-left justify-center text-[#1c1c1c] z-50  max-w-[1220px] mx-auto w-full   flex flex-col h-screen   ">
      <div className="flex flex-col items-start justify-center w-full h-full px-4 rounded-md md:items-center md:px-0 ">
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold ">Spotify Account</h1>
          <p className="font-normal  text-[14px] text-[#63707f] ">
            The Spotify account that you're signed in with.
          </p>
        </div>
        <div className="flex flex-col items-start justify-center w-full pt-5 md:items-center">
          <h2 className="text-[24px] font-semibold ">Username</h2>
          <Link
            target="_blank"
            className="text-[#22c55e] relative cursor-pointer transition-all duration-300 text-sm font-light  before:absolute before:-bottom-[0.1px] before:left-0 before:w-0 before:h-[1.5px] before:rounded-full before:opacity-0 before:transition-all before:duration-300 before:bg-[#22c55e] hover:before:w-full hover:before:opacity-100"
            to={`https://open.spotify.com/user/${userData.id}`}
          >
            {userData.id}
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center w-full h-full gap-5 px-4 rounded-md md:items-center md:px-0">
        <div className="flex flex-col items-start justify-center w-full md:items-center">
          <h2 className="text-[24px] font-semibold ">Email</h2>
          <p className="text-[#63707f] text-[14px]">
            The email address associated with your account.
          </p>
        </div>
        <div>
          <p className="text-[#22c55e] text-sm font-light">{userData.email}</p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center w-full h-full gap-5 px-4 rounded-md md:items-center md:px-0">
        <div className="flex flex-col items-start justify-center w-full md:items-center">
          <h2 className="text-[24px] font-extrabold ">Display Name</h2>
          <p className="text-[#63707f]  text-[14px]">
            The name you are using on spotify.
          </p>
        </div>
        <div>
          <p className="text-[#22c55e] text-sm font-light">
            {userData.display_name}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center w-full h-full gap-5 px-4 rounded-md md:items-center md:px-0">
        <div className="flex flex-col items-start justify-center w-full md:items-center">
          <h2 className="text-[24px] font-semibold ">Plan</h2>
          <p className="text-[#63707f]  text-[14px]">
            Your spotify plan at the current moment
          </p>
        </div>
        <div>
          <p className=" text-sm font-light text-[#22c55e]">
            {userData.product}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center w-full h-full gap-5 px-4 rounded-md md:items-center md:px-0">
        <div className="flex flex-col items-start justify-center w-full md:items-center">
          <h2 className="text-[24px] font-semibold ">Sign Out</h2>
          <p className="text-[#63707f]  text-[14px]">
            Sign out of your account on this browser.
          </p>
        </div>
        <div>
          <button
            onClick={props.logout}
            className="text-[#22c55e] uppercase text-[16px] font-bold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
