import React, { useEffect, useState, useMemo } from "react";
import { LoadingSpinner } from "../elements/Icons";

const Playlists = (props) => {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/playlists?limit=10&offset=0",
          {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setPlaylist(data);
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    }
    fetchPlaylist();
  }, [props.token]);

  const playlistCount = useMemo(() => playlist?.total || 0, [playlist]);

  if (playlist === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      {playlistCount === 0 && <div>You don't have any Playlists yet</div>}
      <div className="text-[16px] font-semibold flex gap-1 lg:pt-10 pt-4">
        You currently have
        <p className="text-[#22c55e]">
          {playlistCount > 1
            ? `${playlistCount} Playlists`
            : `${playlistCount} Playlist`}
        </p>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-2 pt-[10px]">
        {playlist.items?.map((item, index) => (
          <div key={item.name}>
            <div className="flex flex-col items-start justify-start  max-w-[200px] mx-auto w-full">
              {item?.images.map((value) => (
                <div key={value.url}>
                  <div className="">
                    <img
                      src={value.url}
                      className="relative object-cover w-32 h-32 rounded shadow-sm lg:w-44 lg:h-44 "
                      alt=""
                    />
                  </div>
                </div>
              ))}
              <p className="lg:text-[16px] text-[14px] ">
                {/* <span className="text-[#9ca3af] ">{index + 1} </span> */}
                <span className="font-semibold">{item.name}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
