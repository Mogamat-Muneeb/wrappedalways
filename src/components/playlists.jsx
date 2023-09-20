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
      <div className="text-[16px] font-semibold flex gap-1">
        You currently have
        <p className="text-[#22c55e]">
          {playlistCount > 1
            ? `${playlistCount} Playlists`
            : `${playlistCount} Playlist`}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
        {playlist.items?.map((item, index) => (
          <div key={item.name}>
            <div className="flex flex-col items-center pb-5">
              <div className="pb-5">
                <p className="text-[#9ca3af] pr-2">{index + 1}</p>
                <p className="text-[16px] font-semibold">{item.name}</p>
              </div>
              {item?.images.map((value) => (
                <div key={value.url}>
                  <div className="">
                    <img
                      src={value.url}
                      className="relative w-32 h-32 bg-cover rounded lg:w-56 lg:h-56 md:w-44 md:h-44"
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
