import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const CLIENT_ID = "c97efa103ad84e6fb815ec62e02fd446";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="flex  justify-center items-center  px-3 md:px-0">
        {!token ? (
          <div className="flex flex-col gap-3 justify-center items-center text-center">
            <p className="">
              <span className="font-bold text-2xl">
                See your Spotify Wrapped before the end of the year!!
              </span>
              <br />
              <span className="text-[16px] font-normal">
                Your top tracks, artists and genres all in one place.
              </span>
            </p>
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
              className="bg-[#22c55e] py-3 px-4 rounded-3xl text-center text-white shadow-xl text-[16px] "
            >
              Login with Spotify
            </a>
          </div>
        ) : (
          <div>
            <p>You have logged in successfully!!</p>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
