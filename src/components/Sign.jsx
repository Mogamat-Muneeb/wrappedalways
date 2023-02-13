import { useEffect, useState } from "react";
// import "./App.css";
import axios from "axios";
// import Navbar from "../elements/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Sign(props) {
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


  console.log("token: " + token);
  return (
    <>
    {/* {token ? (
      <Navbar/>
    ):(null)} */}
    </>
  );
}

export default Sign;
