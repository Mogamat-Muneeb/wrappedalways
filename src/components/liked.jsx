import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../elements/Icons";

const Liked = (props) => {
  const [liked, setLikedTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let allTracks = [];

        let nextUrl = "https://api.spotify.com/v1/me/tracks";

        while (nextUrl) {
          const response = await fetch(nextUrl, {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
          });

          if (!response.ok) {
            console.error("Error fetching data");
            setIsLoading(false);
            return;
          }

          const data = await response.json();
          allTracks = [...allTracks, ...data.items];
          nextUrl = data.next;
        }

        const sortedTracks = allTracks.sort(
          (a, b) => b.popularity - a.popularity
        );

        setLikedTracks(sortedTracks);
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
    <div className="pt-[20px]">
      <ul>
        {liked.map((track, index) => {
          return (
            <>
              <div key={track.track.id} className="flex gap-6 pt-5">
                <div className="flex items-center gap-1">
                  <span className="text-[#9ca3af] pr-2">{index + 1}</span>
                  <img
                    src={track.track.album.images[0].url} // Assuming you want the first image
                    alt="Album Cover"
                    style={{ width: "50px", height: "50px" }}
                    className="relative w-10 h-10 bg-cover rounded shadow-xl"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-medium">{track.track.name} by</p>
                  <div className="flex gap-1">
                    <p className="text-sm font-light ">
                      {track.track.artists
                        .map((artist) => artist.name)
                        .join(", ")}{" "}
                      -{" "}
                    </p>
                    <p className="text-sm font-light text-gray-400">
                      {new Date(track.added_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Liked;
