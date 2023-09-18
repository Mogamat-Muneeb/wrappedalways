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
      <h2 className="text-[16px] font-semibold flex gap-1">
        You currently have
        <span className="text-[#22c55e]">
          {playlistCount > 1
            ? `${playlistCount} playlists`
            : `${playlistCount} playlist`}
        </span>
      </h2>
      <div className="flex flex-wrap grid-cols-5 gap-4 pt-10 md:grid">
        {playlist.items?.map((item, index) => (
          <div key={item.id}>
            <div className="pb-5">
              <h2 className="pb-5">
                <span className="text-[#9ca3af] pr-2">{index + 1}</span>
                <span className="text-[16px] font-semibold">{item.name}</span>
              </h2>
              {item?.images.map((value) => (
                <div key={value.id}>
                  <div className="">
                    <img
                      src={value.url}
                      className="relative w-56 h-56 bg-cover rounded shadow-xl"
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
