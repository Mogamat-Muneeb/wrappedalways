import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="md:mt-24 mt-10 text-[#1c1c1c] max-w-[1285px] mx-auto w-full md:px-0  flex flex-col  ">
      <div className="flex flex-col items-start justify-center w-full h-full gap-5 p-4 rounded-md md:p-10">
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold ">Spotify Account</h1>
          <p className="font-normal text-[16px] text-[#63707f] ">
            The Spotify account that you're signed in with.
          </p>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-extrabold ">Username</h2>
          <Link
            target="_blank"
            className="text-[#14c4e1] hover:text-white hover:underline"
            to={`https://open.spotify.com/user/${userData.id}`}
          >
            {userData.id}
          </Link>
        </div>
      </div>

      <div className="flex flex-col h-full gap-5 p-4 rounded-md md:p-10 ">
        <div className="flex flex-col">
          <h2 className="text-2xl font-extrabold ">Email</h2>
          <p className="text-[#63707f]">
            The email address associated with your account.
          </p>
        </div>
        <div>
          <p className="text-[#14c4e1]">{userData.email}</p>
        </div>
      </div>

      <div className="flex flex-col h-full gap-5 p-4 rounded-md md:p-10">
        <div className="flex flex-col">
          <h2 className="text-2xl font-extrabold ">Display Name</h2>
          <p className="text-[#63707f]">The name you are using on spotify.</p>
        </div>
        <div>
          <p className="text-[#14c4e1]"> {userData.display_name}</p>
        </div>
      </div>

      <div className="flex flex-col h-full gap-5 p-4 rounded-md md:p-10">
        <div className="flex flex-col">
          <h2 className="text-2xl font-extrabold ">Plan</h2>
          <p className="text-[#63707f]">
            Your spotify plan at the current moment
          </p>
        </div>
        <div>
          <p className="uppercase text-[#14c4e1]"> {userData.product}</p>
        </div>
      </div>

      <div className="flex flex-col h-full gap-5 p-4 rounded-md md:p-10 ">
        <div className="flex flex-col">
          <h2 className="text-2xl font-extrabold ">Sign Out</h2>
          <p className="text-[#63707f]">
            Sign out of your account on this browser.
          </p>
        </div>
        <div>
          <button onClick={props.logout} className="text-[#14c4e1] uppercase text-[16px] font-bold">
            Logout
          </button>
        </div>
      </div>
      {/* <img src={userData.images[0].url} alt="Profile" /> */}
    </div>
  );
}
