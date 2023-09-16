import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../elements/Icons";

const Tracks = (props) => {
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=11&offset=6",
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Sort tracks by popularity score in descending order
        const sortedTracks = data.items.sort(
          (a, b) => b.popularity - a.popularity
        );
        setTracks(sortedTracks);
      });
  }, [props.token]);

  if (!tracks) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="flex space-x-2">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {tracks.length === 0 && <div>You dont have any Top Tracks yet!</div>}
      <div className="flex flex-col gap-6 pt-5">
        {tracks.map((item, index) => {
          // console.log(item.album.images[2], " the tracks");
          return (
            <div key={item.id}>
              <div className="flex ">
                <div>
                  <span className="text-[#9ca3af] pr-2">{index + 1}</span>
                </div>
                <div className="flex gap-3 ">
                  <img
                    src={item.album.images[1].url}
                    alt=""
                    className="relative w-10 h-10 bg-cover rounded shadow-xl"
                  />
                  <h2>
                    <span className="font-medium">{item.name}</span>
                    <div className="flex flex-col ">
                      <div className="flex flex-wrap gap-2 text-sm text-gray-200 ">
                        {item.artists.map((value, index) => (
                          <div key={value.id} className="">
                            <p className="flex items-center ">
                              <span className={`${index > 0 && "px-1"}`}>
                                {" "}
                                {index > 0 && "•"}
                              </span>
                              <span className="text-sm font-light text-gray-400">
                                {value.name}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tracks;
