import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../elements/Icons";

const Tracks = React.memo((props) => {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=11&offset=6",
          {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
          }
        );

        if (!response.ok) {
          // Handle error here
          console.error("Error fetching data");
          return;
        }

        const data = await response.json();
        const sortedTracks = data.items.sort(
          (a, b) => b.popularity - a.popularity
        );
        setTracks(sortedTracks);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex space-x-2">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {tracks.length === 0 && <div>You don't have any Top Tracks yet!</div>}
      <div className="flex flex-col gap-6 pt-5">
        {tracks.map((item, index) => (
          <div key={item.id}>
            <div className="flex">
              <div></div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 ">
                  <span className="text-[#9ca3af] pr-2">{index + 1}</span>
                  <img
                    src={item.album.images[1].url}
                    alt=""
                    className="relative w-10 h-10 bg-cover rounded shadow-xl"
                  />
                </div>
                <h2>
                  <span className="font-medium">{item.name}</span>
                  <div className="flex flex-col">
                    <div className="flex flex-wrap gap-2 text-sm text-gray-200">
                      {item.artists.map((value, index) => (
                        <div key={value.id} className="">
                          <p className="flex items-center">
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
        ))}
      </div>
    </div>
  );
});

export default Tracks;
