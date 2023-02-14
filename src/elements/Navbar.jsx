import React from "react";
import { Link } from "react-router-dom";
export default function Navbar(props) {
  return (
    <>
      {props.token ? (
        <div className="text-white h-16 bg-[#1c1c1c] flex items-center px-10 sticky top-0 z-10">
          <div className="w-full bg-[#1c1c1c]">
            <Link to="/" className="bg-[#1c1c1c]">LOGO</Link>
          </div>
          <div className="flex items-end justify-end w-full gap-4 bg-[#1c1c1c]">
            <Link to="stats" className="font-semibold bg-[#1c1c1c]">
              Stats
            </Link>
            <Link to="account" className="font-semibold bg-[#1c1c1c]">
              Account
            </Link>
            <button onClick={props.logout}>Logout</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
