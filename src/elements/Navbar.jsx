import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineSegment } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
export default function Navbar(props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      {props.token ? (
        <div className="text-white h-16 bg-[#1c1c1c] md:flex hidden items-center  sticky top-0 z-10">
          <div className="max-w-[1285px] mx-auto flex items-center w-full">
          <div className="w-full bg-[#1c1c1c]">
            <Link to="/" className="bg-[#1c1c1c]">
              LOGO
            </Link>
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
        </div>
      ) : null}
      {props.token ? (
        <>
          <div className="sticky top-0 z-10 flex items-center h-16 px-3 bg-[#1c1c1c] text-white md:hidden">
            <div className="flex items-center justify-between w-full bg-[#1c1c1c]">
              <Link to="/" className="flex items-center justify-start w-full">LOGO</Link>
              <div
                className="flex items-center justify-end w-full"
                onClick={handleClick}
              >
                <MdOutlineSegment className="font-bold text-[25px]" />
              </div>
            </div>
    
            </div>
            <div
            className={`${open
              ? ' transition-all duration-500 bg-white'
              : ' translate-x-full  transition-all duration-500 bg-[#FFFFFF]'
              } fixed   overflow-y-auto z-50  lg:hidden w-full re-d overflow-x-hidden top-0`}
            >
              <div className="flex items-center justify-between w-full h-16 px-2  border-b border-[#bbbbbb]">
              <Link to="/" className="flex items-center justify-start w-full text-[#1DB954] "  onClick={handleClick}>LOGO</Link>
              <div
                className="flex items-center justify-end w-full"
                onClick={handleClick}
              >
                <RxCross2 className="font-bold text-[25px]" onClick={handleClick} />
              </div>
            </div>
            <div className="flex flex-col gap-4 px-2 pt-4">
              <Link to="stats" className="font-semibold " onClick={handleClick}>
                Stats
              </Link>
              <Link to="account" className="font-semibold "  onClick={handleClick}>
                Account
              </Link>
              <div>

              <button onClick={props.logout}>Logout</button>
              </div>

            </div>
            </div>
    
         
        </>
      ) : null}
    </>
  );
}
