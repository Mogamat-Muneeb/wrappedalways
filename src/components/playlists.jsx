import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../elements/Icons";

const Playlists = (props) => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/playlists?limit=10&offset=0", {
      headers: {
        Authorization: `Bearer  ${props.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPlaylist(data));
  }, [props.token]);

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="flex space-x-2">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  return (
    <div>
      {playlist.length === 0 && <div>you dont have any Playlists yet</div>}
      <h2 className="text-[16px] font-semibold flex gap-1">
        You currently have
        <span className="text-[#22c55e]">
          {playlist.total > 1
            ? `${playlist.total} playlists`
            : `${playlist.total} playlist`}
        </span>
      </h2>
      <div className="flex flex-wrap grid-cols-5 gap-4 pt-10 md:grid">
        {playlist.items?.map((item, index) => {
          return (
            <div key={item.id}>
              <div className="pb-5 ">
                <h2 className="pb-5">
                  <span className="text-[#9ca3af] pr-2">{index + 1}</span>
                  <span className="text-[16px] font-semibold">{item.name}</span>
                </h2>
                {item?.images.map((value, index) => {
                  return (
                    <div key={value.id}>
                      <div className="">
                        <img
                          src={value.url}
                          className="relative w-56 h-56 bg-cover rounded shadow-xl"
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playlists;
