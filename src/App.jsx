import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Stats from "./components/Stats";
import Account from "./components/Account";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./elements/Icons";
import CurrentPlaying from "./components/CurrentPlaying";
import SideBar from "./elements/Navbar";
import NotAuthenticated from "./components/NotAuthenticated";

// function App() {
//   const [token, setToken] = useState("");
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const hash = window.location.hash;
//     let token = window.localStorage.getItem("token");

//     if (!token && hash) {
//       token = hash
//         .substring(1)
//         .split("&")
//         .find((elem) => elem.startsWith("access_token"))
//         .split("=")[1];

//       window.location.hash = "";
//       window.localStorage.setItem("token", token);
//     }

//     setToken(token);
//   }, []);

//   const logout = () => {
//     setToken("");
//     window.localStorage.removeItem("token");
//   };
//   useEffect(() => {
//     fetch("https://api.spotify.com/v1/me", {
//       headers: {
//         Authorization: `Bearer  ${token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => setUserData(data));
//   }, [token]);

function App() {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      const expiresIn = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("expires_in"))
        .split("=")[1];
      console.log("🚀 ~ file: App.jsx:67 ~ useEffect ~ expiresIn:", expiresIn)

      const expirationTime = new Date().getTime() + expiresIn * 1000;

      window.location.hash = "";
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("tokenExpiration", expirationTime);
    }

    setToken(token);
  }, [navigate]);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("tokenExpiration");
  };

  const refreshAccessToken = async () => {
    const refreshToken = window.localStorage.getItem("refreshToken");
    const clientId = "your_client_id";
    const clientSecret = "your_client_secret";

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      console.error("Failed to refresh access token");
      return null;
    }

    const data = await response.json();
    const newAccessToken = data.access_token;
    const newExpirationTime = new Date().getTime() + data.expires_in * 1000;

    // Update the token and expiration time in local storage
    window.localStorage.setItem("token", newAccessToken);
    window.localStorage.setItem("tokenExpiration", newExpirationTime);

    return newAccessToken;
  };

  const checkTokenExpiration = async () => {
    const expirationTime = window.localStorage.getItem("tokenExpiration");

    if (expirationTime && new Date().getTime() > expirationTime) {
      // Token has expired, refresh it
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // If refresh was successful, set the new token
        setToken(newAccessToken);
      } else {
        // Handle the case where refresh failed, e.g., redirect to login
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();

    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, [token, navigate]);

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
    <>
      <div className="hidden md:grid md:grid-cols-12">
        <div
          className={` ${
            token
              ? "fixed   z-[60] px-3 bg-gray-100 py-3 md:py-6 md:col-span-1 space-y-2 md:min-h-screen"
              : "hidden"
          }`}
        >
          <SideBar token={token} logout={logout} />
        </div>
        <div
          className={` bg-gray-100 ${
            token
              ? "md:col-span-11 pb-8 px-8 space-y-8 lg:ml-[7%] md:ml-[10%] ml-0"
              : "md:col-span-12"
          } `}
        >
          <Routes>
            <Route
              path="/"
              element={
                <div className="">
                  {!token ? (
                    <NotAuthenticated />
                  ) : (
                    <>
                      <div className="">
                        <Stats userData={userData} token={token} />
                      </div>

                      <CurrentPlaying userData={userData} token={token} />
                    </>
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

      {/* MOBILE */}
      <div className="md:hidden bock">
        <SideBar token={token} logout={logout} />
        <Routes>
          <Route
            path="/"
            element={
              <div className="">
                {!token ? (
                  <NotAuthenticated />
                ) : (
                  <>
                    <div className="flex flex-col gap-2 md:px-0 px-2 h-full  md:mt-32 mt-10 max-w-[1285px] mx-auto w-full">
                      <Stats userData={userData} token={token} />
                    </div>
                    <div className="mx-3">
                      <CurrentPlaying userData={userData} token={token} />
                    </div>
                  </>
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
