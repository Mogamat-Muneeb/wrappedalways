import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link
} from "react-router-dom";
import Stats from "./components/Stats";
import Account from "./components/Account";
import Landing from "./components/Landing";
import Navbar from "./elements/Navbar";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";


function App() {
  const CLIENT_ID = "c97efa103ad84e6fb815ec62e02fd446";
  const REDIRECT_URI = "https://wrappedalways.vercel.app/";
  // const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [token, setToken] = useState("");
  console.log(token)

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
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer  ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setUserData(data));
  }, [token]);




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
      )
  }




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
                      href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-read-collaborative%20playlist-read-private%20user-follow-read%20user-library-read%20user-read-currently-playing%20user-read-email%20user-read-playback-position%20user-read-playback-state%20user-read-private%20user-read-recently-played%20user-top-read`}
                      className="bg-[#22c55e] py-3 px-4 rounded-3xl text-center text-white shadow-xl text-[16px] "
                    >
                      Login with Spotify
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 md:px-0 px-2 max-w-[1285px] mx-auto w-full">
                    {/* <div className="font-bold text-[16px] flex gap-4">
                      <h1> Welcome, <span >{userData.display_name}!</span> </h1>
                    <Link to={"/account"} className="text-[#22c55e] relative cursor-pointer transition-all duration-300  before:absolute before:-bottom-[0.1px] before:left-0 before:w-0 before:h-[1.5px] before:rounded-full before:opacity-0 before:transition-all before:duration-300 before:bg-[#22c55e] hover:before:w-full hover:before:opacity-100"> Go to your account </Link>
                    </div> */}
                    <Stats userData={userData} token={token}  /> 
                  </div>
                )}
              </div>
          }
        />
        <Route path="/account" element={token ? <Account token={token} logout={logout} /> : <Navigate to="/" />}  />
        {/* <Route path="/stats" element={token ? <Stats userData={userData} token={token}  />  : <Navigate to="/" />} /> */}
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
                      href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-read-collaborative%20playlist-read-private%20user-follow-read%20user-library-read%20user-read-currently-playing%20user-read-email%20user-read-playback-position%20user-read-playback-state%20user-read-private%20user-read-recently-played%20user-top-read`}
                      className="bg-[#22c55e] py-3 px-4 rounded-3xl text-center text-white shadow-xl text-[16px] "
                    >
                      Login with Spotify
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 md:px-0 px-2 h-full  md:mt-32 mt-10 max-w-[1285px] mx-auto w-full">
                    {/* <div className="font-bold text-[16px] flex gap-4">
                      <h1> Welcome, <span >{userData.display_name}!</span> </h1>
                    <Link to={"/account"} className="text-[#22c55e] relative cursor-pointer transition-all duration-300  before:absolute before:-bottom-[0.1px] before:left-0 before:w-0 before:h-[1.5px] before:rounded-full before:opacity-0 before:transition-all before:duration-300 before:bg-[#22c55e] hover:before:w-full hover:before:opacity-100"> Go to your account </Link>
                    </div> */}
                    <Stats userData={userData} token={token}  /> 
                  </div>
                )}
              </div>
          }
        />
        <Route path="/account" element={token ? <Account token={token} logout={logout} /> : <Navigate to="/" />}  />
        {/* <Route path="/stats" element={token ? <Stats userData={userData} token={token}  />  : <Navigate to="/" />} /> */}
      </Routes>
  </div>

    </>
  );
}

export default App;

