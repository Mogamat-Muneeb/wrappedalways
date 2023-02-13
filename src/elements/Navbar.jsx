import React from "react";
import { Link } from "react-router-dom";
export default function Navbar(props) {
  return (
    <>
      {props.token ? (
        <div className="text-white h-16 bg-[#1c1c1c] flex items-center px-10 sticky top-0 z-10">
          <div className="w-full">
            <Link to="/">LOGO</Link>
          </div>
          <div className="flex items-end justify-end w-full gap-4">
            <Link to="stats" className="font-semibold">
              Stats
            </Link>
            <Link to="account" className="font-semibold">
              Account
            </Link>
            <button onClick={props.logout}>Logout</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
