import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Account(props) {

  const [userData, setUserData] = useState(null);
console.log(userData)
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
        class="fill-[#14c4e1]"
        d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
      <path
        class="fill-gray-800"
        d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
    </svg>
  </div>
</div>
</div>
    );
  }

  return (
    <div className="md:mt-24 mt-10 text-[#1c1c1c] max-w-[1285px] mx-auto w-full md:px-0  flex flex-col   ">
      <div className="flex flex-col items-start justify-center w-full h-full gap-5 p-4 rounded-md md:p-10 ">
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
