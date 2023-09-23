import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../elements/Icons";

const Genres = (props) => {
  const [topGenres, setTopGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopGenres = async () => {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10",
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      const data = await response.json();

      const genres = data.items.flatMap((artist) => artist.genres);
      const genreCounts = genres.reduce((acc, genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
      }, {});
      const sortedGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map((entry) => entry[0]);

      setTopGenres(sortedGenres);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopGenres();
  }, [props.token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex space-x-2">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div>
      {topGenres.length ? (
        <div className="flex flex-col gap-3 ">
          {topGenres.map((item, index) => (
            <div key={item} className="py-4">
              <h2 className="flex">
                <span className="text-[#9ca3af] mr-2">{index + 1}</span>
                <span className="">{item}</span>
              </h2>
            </div>
          ))}
        </div>
      ) : (
        <div className="pt-5">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default Genres;
