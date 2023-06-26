import React, { useState } from "react";
import Genres from "./genres";
import Artists from "./artists";
import Tracks from "./tracks";
import Playlists from "./playlists";
const Stats = (props) => {
  const [showing, setShowing] = useState("Top Genres");

  return (
    <div className="flex items-center justify-center h-full md:mt-10 mt-14 ">
      <div className="md:flex hidden w-full  max-w-[1220px] mx-auto justify-center md:gap-0 gap-2 z-40  h-14 shadow-sm  fixed md:top-12  top-24 bg-white items-center px-2 rounded-md ">
        <div
          className={`cursor-pointer md:text-[20px] text-[14px]  justify-center font-semibold bg-transparent flex items-center w-full h-14   ${
            showing === "Top Genres" &&
            "font-bold text-[#22c55e] transition-all duration-150 "
          }`}
          onClick={() => setShowing("Top Genres")}
        >
          Top Genres
        </div>
        <div
          className={`cursor-pointer  md:text-[20px] text-[14px] font-semibold justify-center bg-transparent w-full  flex items-center  h-14 ${
            showing === "Top Artists" &&
            "font-bold text-[#22c55e] transition-all duration-150"
          }`}
          onClick={() => setShowing("Top Artists")}
        >
          Top Artists
        </div>
        <div
          className={`cursor-pointer  md:text-[20px] text-[14px] font-semibold  justify-center bg-transparent w-full  flex items-center h-14 ${
            showing === "Top Tracks" &&
            "font-bold text-[#22c55e] transition-all duration-150"
          }`}
          onClick={() => setShowing("Top Tracks")}
        >
          Top Tracks
        </div>
        <div
          className={`cursor-pointer  md:text-[20px] text-[14px] font-semibold  justify-center bg-transparent w-full  flex items-center h-14 ${
            showing === "Top Playlists" &&
            "font-bold text-[#22c55e] transition-all duration-150"
          }`}
          onClick={() => setShowing("Top Playlists")}
        >
          Playlists
        </div>
      </div>
      <div className="fixed z-40 flex items-center justify-center w-full gap-2 px-1 bg-white rounded-sm shadow-sm md:hidden md:gap-0 h-14 md:top-12 top-24 ">
        <div
          className={`cursor-pointer  text-[14px] font-medium bg-transparent flex items-center justify-center w-full  h-14   ${
            showing === "Top Genres" &&
            "font-bold text-[#22c55e] transition-all duration-150 "
          }`}
          onClick={() => setShowing("Top Genres")}
        >
          Top Genres
        </div>
        <div
          className={`cursor-pointer  text-[14px]  font-medium bg-transparent   flex items-center  justify-center w-full h-14 ${
            showing === "Top Artists" &&
            "font-bold text-[#22c55e] transition-all duration-150"
          }`}
          onClick={() => setShowing("Top Artists")}
        >
          Top Artists
        </div>
        <div
          className={`cursor-pointer   text-[14px]  font-medium bg-transparent  flex items-center justify-center w-full h-14 ${
            showing === "Top Tracks" &&
            "font-bold text-[#22c55e] transition-all duration-150"
          }`}
          onClick={() => setShowing("Top Tracks")}
        >
          Top Tracks
        </div>
        <div
          className={`cursor-pointer   text-[14px]  font-medium bg-transparent   flex items-center  justify-center w-full h-14 ${
            showing === "Top Playlists" &&
            "font-bold text-[#22c55e] transition-all duration-150"
          }`}
          onClick={() => setShowing("Top Playlists")}
        >
          Playlists
        </div>
      </div>
      <div className="w-full px-2 md:mt-10 mt-3 max-h-[650px] overflow-x-auto   md:px-0">
        <div className="flex flex-col gap-10 mt-10  max-w-[1220px]  mx-auto   ">
          {showing === "Top Genres" && (
            <>
              <div id="Genres">
                <Genres token={props.token} />
              </div>
            </>
          )}

          {showing === "Top Artists" && (
            <>
              <div id="Artists">
                <Artists token={props.token} />
              </div>
            </>
          )}

          {showing === "Top Tracks" && (
            <>
              <div id="Tracks">
                <Tracks token={props.token} />
              </div>
            </>
          )}

          {showing === "Top Playlists" && (
            <>
              <div id="Playlists" className="pt-5 mb-10">
                <Playlists token={props.token} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
