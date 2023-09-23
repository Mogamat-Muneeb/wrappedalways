import React from "react";

const NotAuthenticated = () => {
  return (
    <>
      <div className="flex-col items-center justify-center hidden w-full min-h-screen gap-3 px-2 lg:flex text-centermd:px-0">
        <p className="flex flex-col text-center">
          <span className="text-2xl font-bold">
            See your Spotify Wrapped before the end of the year!!
          </span>

          <span className="text-[16px] font-normal">
            Your top tracks, artists and genres all in one place.
          </span>
        </p>
        <a
          href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}&scope=playlist-read-collaborative%20playlist-read-private%20user-follow-read%20user-library-read%20user-read-currently-playing%20user-read-email%20user-read-playback-position%20user-read-playback-state%20user-read-private%20user-read-recently-played%20user-top-read`}
          className="bg-[#22c55e] py-3 px-4 rounded-3xl text-center text-white shadow-xl text-[16px] font-bold"
        >
          Login with Spotify
        </a>
      </div>
      <div className="flex flex-col items-center justify-center w-full min-h-screen gap-3 px-2 text-center lg:hidden md:px-0">
        <p className="">
          <span className="text-2xl font-bold">
            See your Spotify Wrapped before the end of the year!!
          </span>
          <br />
          <span className="text-[16px] font-normal">
            Your top tracks, artists and genres all in one place.
          </span>
        </p>
        <a
          href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}&scope=playlist-read-collaborative%20playlist-read-private%20user-follow-read%20user-library-read%20user-read-currently-playing%20user-read-email%20user-read-playback-position%20user-read-playback-state%20user-read-private%20user-read-recently-played%20user-top-read`}
          className="bg-[#22c55e] py-3 px-4 rounded-3xl text-center text-white shadow-xl text-[16px] font-bold "
        >
          Login with Spotify
        </a>
      </div>
    </>
  );
};

export default NotAuthenticated;
