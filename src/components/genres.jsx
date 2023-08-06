import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../elements/Icons";
import { Link } from "react-router-dom";

const Genres = (props) => {
  const [topGenres, setTopGenres] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10",
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const genres = data.items.flatMap((artist) => artist.genres);
        const genreCounts = genres.reduce((acc, genre) => {
          if (!acc[genre]) {
            acc[genre] = 1;
          } else {
            acc[genre]++;
          }
          return acc;
        }, {});
        const topGenres = Object.entries(genreCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map((entry) => entry[0]);
        setTopGenres(topGenres);
      });
  }, [props.token]);

  if (!topGenres) {
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
      {topGenres.length ? (
        <div className="flex flex-col gap-3 pt-5 ">
          {topGenres.map((item, index) => {
            return (
              <div key={item.id} className="py-4 ">
                <h2 className="flex items-center">
                  <span className="text-[#9ca3af] text-[12px] mr-2 pt-1">{index + 1}</span>
                  <Link to={`/genre/${item}`} className=""> {item}</Link>
                </h2>
              </div>
            );
          })}
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
