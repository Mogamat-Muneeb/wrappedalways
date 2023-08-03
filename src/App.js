import { Route, Routes, Navigate } from "react-router-dom";
import Stats from "./components/Stats";
import Account from "./components/Account";
import Navbar from "./elements/Navbar";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./elements/Icons";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.sessionStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.sessionStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.sessionStorage.removeItem("token");
  };

  const [userData, setUserData] = useState(null);
  //  user data
  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, [token]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="flex space-x-2">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  console.log('====================================');
  console.log(`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}&scope=playlist-read-collaborative%20playlist-read-private%20user-follow-read%20user-library-read%20user-read-currently-playing%20user-read-email%20user-read-playback-position%20user-read-playback-state%20user-read-private%20user-read-recently-played%20user-top-read`);
  console.log('====================================');

  return (
    <>
      <div className="hidden w-full md:flex ">
        <div className={` ${token && "sticky w-20 z-[60]"}`}>
          <Navbar token={token} logout={logout} />
        </div>
        <div className="w-full bg-gray-100 md:max-h-screen ">
          <Routes>
            <Route
              path="/"
              element={
                <div className="">
                  {!token ? (
                    <div className="flex flex-col items-center justify-center w-full h-screen gap-3 px-2 text-center md:px-0">
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
                        className="bg-[#22c55e] py-3 px-4 rounded-3xl text-center text-white shadow-xl text-[16px] "
                      >
                        Login with Spotify
                      </a>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 md:px-0 px-2 max-w-[1285px] mx-auto w-full">
                      <Stats userData={userData} token={token} />
                    </div>
                  )}
                </div>
              }
            />
            <Route
              path="/account"
              element={
                token ? (
                  <Account token={token} logout={logout} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </div>
      </div>
      <div className="md:hidden bock">
        <Navbar token={token} logout={logout} />
        <Routes>
          <Route
            path="/"
            element={
              <div className="">
                {!token ? (
                  <div className="flex flex-col items-center justify-center w-full h-screen gap-3 px-2 text-center md:px-0">
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
                      href={`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}&scope=playlist-read-collaborative%20playlist-read-private%20user-follow-read%20user-library-read%20user-read-currently-playing%20user-read-email%20user-read-playback-position%20user-read-playback-state%20user-read-private%20user-read-recently-played%20user-top-read`}
                      className="bg-[#22c55e] py-3 px-4 rounded-3xl text-center text-white shadow-xl text-[16px] "
                    >
                      Login with Spotify
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 md:px-0 px-2 h-full  md:mt-32 mt-10 max-w-[1285px] mx-auto w-full">
                    <Stats userData={userData} token={token} />
                  </div>
                )}
              </div>
            }
          />
          <Route
            path="/account"
            element={
              token ? (
                <Account token={token} logout={logout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
