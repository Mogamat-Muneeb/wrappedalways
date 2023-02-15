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


  const [tracks, setTracks] = useState([]);
  
  useEffect(() => {
    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=5', {
        headers: {
          'Authorization': `Bearer  ${token}`
        }
      })
      .then(response =>
response.json()
       
         )
      .then(data => setTracks(data));
  }, [token]);




console.log('tracks', tracks)


  if (!userData) {
    return <div>Loading...</div>;
  }




  return (
    <>
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
                      className="bg-[#1DB954] py-3 px-4 rounded-3xl text-center text-white shadow-xl text-[16px] "
                    >
                      Login with Spotify
                    </a>
                  </div>
                ) : (
                  <div className="flex gap-2 max-w-[1285px] mx-auto w-full">
                    Welcome, {userData.display_name}! <br/>
                    <Link to={"/account"}>Account</Link>
                    <Landing token={token}/>
                  </div>
                )}
              </div>
          }
        />
        <Route path="/account" element={token ? <Account token={token} logout={logout} /> : <Navigate to="/" />}  />
        <Route path="/stats" element={token ? <Stats userData={userData} token={token}  />  : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

