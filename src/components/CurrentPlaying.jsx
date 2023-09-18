import React, { useEffect, useState } from "react";
import axios from "axios";

const CurrentPlaying = (props) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!props.token) return;

    const headers = {
      Authorization: `Bearer ${props.token}`,
    };

    axios
      .get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers,
      })
      .then((response) => {
        const trackName = response.data.item.name;
        const artistName = response.data.item.artists[0].name;
        const albumName = response.data.item.album.name;
        const albumCover = response.data.item.album.images[0].url;

        setCurrentSong({ trackName, artistName, albumName, albumCover });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching current song: ", error);
        setIsLoading(false);
      });
  }, [props.token]);

  return (
    <div className="w-full max-w-[1220px] mx-auto">
      <div className="flex w-full max-w-[1220px] mx-auto justify-center md:gap-0 gap-2 z-40 h-14 shadow-sm fixed md:bottom-12 bottom-24 bg-white items-center px-2 rounded-md">
        {isLoading ? (
          "Loading..."
        ) : currentSong ? (
          <div className="flex ">
            <div className="flex flex-col">
              <p>{currentSong.trackName}</p>
              <p>
                {currentSong.albumName} / {currentSong.artistName}
              </p>
            </div>
            <div>
              <img
                src={currentSong.albumCover}
                alt=""
                className="object-cover w-12 h-12 rounded-md"
              />
            </div>
          </div>
        ) : (
          <div className="">
            <p>Nothing is playing at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentPlaying;
