import React, { useState } from "react";
import Genres from "./genres";
import Artists from "./artists";
import Tracks from "./tracks";
import Playlists from "./playlists";
import Liked from "./liked";
import ScrollableMenu from "../elements/TabCarousel";
const Stats = (props) => {
  const [showing, setShowing] = useState("Top Genres");

  return (
    <div className="relative flex flex-col items-center justify-center h-full ">
      <div className="sticky lg:top-0 md:top-0 top-14 bg-white   w-full  mt-6  mx-auto z-[60] lg:hidden block ">
        <ScrollableMenu>
          <div
            className={`cursor-pointer   justify-center font-semibold bg-transparent flex items-center w-full h-14  lg:min-w-[200px] min-w-[130px]   ${
              showing === "Top Genres"
                ? "font-bold text-[#22c55e] transition-all duration-150 md:text-[20px] text-[16px]  "
                : "font-bold  transition-all duration-150 md:text-[16px] text-[14px]"
            }`}
            onClick={() => setShowing("Top Genres")}
          >
            Top Genres
          </div>
          <div
            className={`cursor-pointer   font-semibold justify-center bg-transparent w-full  flex items-center  h-14 lg:min-w-[200px] min-w-[130px]  ${
              showing === "Top Artists"
                ? "font-bold text-[#22c55e] transition-all duration-150 md:text-[20px] text-[16px]  "
                : "font-bold  transition-all duration-150 md:text-[16px] text-[14px]"
            }`}
            onClick={() => setShowing("Top Artists")}
          >
            Top Artists
          </div>
          <div
            className={`cursor-pointer   font-semibold  justify-center bg-transparent w-full  flex items-center lg:min-w-[200px] min-w-[150px] h-14 ${
              showing === "Top Tracks"
                ? "font-bold text-[#22c55e] transition-all duration-150 md:text-[20px] text-[16px]  "
                : "font-bold  transition-all duration-150 md:text-[16px] text-[14px]"
            }`}
            onClick={() => setShowing("Top Tracks")}
          >
            Top Tracks
          </div>
          <div
            className={`cursor-pointer   font-semibold  justify-center bg-transparent w-full  flex items-center lg:min-w-[200px] min-w-[150px] h-14 ${
              showing === "Top Playlists"
                ? "font-bold text-[#22c55e] transition-all duration-150 md:text-[20px] text-[16px]  "
                : "font-bold  transition-all duration-150 md:text-[16px] text-[14px]"
            }`}
            onClick={() => setShowing("Top Playlists")}
          >
            Playlists
          </div>
          <div
            className={`cursor-pointer   font-semibold  justify-center bg-transparent w-full  flex items-center lg:min-w-[200px] min-w-[150px] h-14 ${
              showing === "Liked Tracks"
                ? "font-bold text-[#22c55e] transition-all duration-150 md:text-[20px] text-[16px]  "
                : "font-bold  transition-all duration-150 md:text-[16px] text-[14px]"
            }`}
            onClick={() => setShowing("Liked Tracks")}
          >
            Liked Tracks
          </div>
        </ScrollableMenu>
      </div>
      <div className="sticky lg:top-0 md:top-0 top-14  bg-gray-100  w-full   mx-auto z-[60]  lg:block hidden   ">
        <div className="flex items-center justify-center w-full gap-2 px-2 mx-auto mt-4 bg-white rounded-md shadow-sm md:gap-0 h-14 ">
          <div
            className={`cursor-pointer   justify-center font-semibold bg-transparent flex items-center w-full h-14   ${
              showing === "Top Genres"
                ? "font-bold text-[#22c55e] transition-all duration-150 md:text-[20px] text-[16px]  "
                : "font-bold  transition-all duration-150 md:text-[16px] text-[14px]"
            }`}
            onClick={() => setShowing("Top Genres")}
          >
            Top Genres
          </div>
          <div
            className={`cursor-pointer   font-semibold justify-center bg-transparent w-full  flex items-center  h-14 ${
              showing === "Top Artists"
                ? "font-bold text-[#22c55e] transition-all duration-150 md:text-[20px] text-[16px]  "
                : "font-bold  transition-all duration-150 md:text-[16px] text-[14px]"
            }`}
            onClick={() => setShowing("Top Artists")}
          >
            Top Artists
          </div>
          <div
            className={`cursor-pointer   font-semibold  justify-center bg-transparent w-full  flex items-center h-14 ${
              showing === "Top Tracks"
                ? "font-bold text-[#22c55e] transition-all duration-150 md:text-[20px] text-[16px]  "
                : "font-bold  transition-all duration-150 md:text-[16px] text-[14px]"
            }`}
            onClick={() => setShowing("Top Tracks")}
          >
            Top Tracks
          </div>
          <div
            className={`cursor-pointer   font-semibold  justify-center bg-transparent w-full  flex items-center h-14 ${
              showing === "Top Playlists"
                ? "font-bold text-[#22c55e] transition-all duration-150 md:text-[20px] text-[16px]  "
                : "font-bold  transition-all duration-150 md:text-[16px] text-[14px]"
            }`}
            onClick={() => setShowing("Top Playlists")}
          >
            Playlists
          </div>
          <div
            className={`cursor-pointer   font-semibold  justify-center bg-transparent w-full  flex items-center h-14 ${
              showing === "Liked Tracks"
                ? "font-bold text-[#22c55e] transition-all duration-150 md:text-[20px] text-[16px]  "
                : "font-bold  transition-all duration-150 md:text-[16px] text-[14px]"
            }`}
            onClick={() => setShowing("Liked Tracks")}
          >
            Liked Tracks
          </div>
        </div>
      </div>

      <div className="w-full pt-16 pb-10 lg:pt-0 lg:pb-0">
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
            <div id="Playlists">
              <Playlists token={props.token} />
            </div>
          </>
        )}
        {showing === "Liked Tracks" && (
          <>
            <Liked token={props.token} />
          </>
        )}
      </div>
    </div>
  );
};

export default Stats;
