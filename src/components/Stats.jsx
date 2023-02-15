import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Stats = (props) => {
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [album, setAlbums] = useState([]);
console.log(props.userData, "userData")

  // Get User’s Top Items
  useEffect(() => {
    fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=11&offset=6",
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Sort tracks by popularity score in descending order
        const sortedTracks = data.items.sort((a, b) => b.popularity - a.popularity);
        setTracks(sortedTracks);
      });
  }, [props.token]);

  // console.log("tracks inside ", tracks);
  
  // Get Current User’s Playlists
  useEffect(() => {
    fetch(
      "https://api.spotify.com/v1/me/playlists?limit=10&offset=0",
      {
        headers: {
          Authorization: `Bearer  ${props.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setPlaylist(data));
  }, [props.token]);

  // console.log("playlist inside ", playlist);


   // Get Current Top Genres
  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    })
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
  
// console.log("TOp genres", topGenres)



   // Get Current Top Albums

   useEffect(() => {
    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=11&offset=6', {
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setAlbums(data.items);
    });
  }, [props.token]);

  // console.log("Top album", album)

  if (!props.userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div>
      <div className="mt-32 text-[#1c1c1c] max-w-[1285px] mx-auto w-full md:px-0 px-2">
        <Link
          target="_blank"
          to={`https://open.spotify.com/user/${props.userData.id}`}
        >
          Logo spotify open in Spotiy
        </Link>
        <div>
          <h1 className="text-4xl font-extrabold sm:text-3xl">Top Genres</h1>
        </div>
        <div>
          <h1 className="text-4xl font-extrabold sm:text-3xl">Top Artists</h1>
        </div>
        <div>
          <h1 className="text-4xl font-extrabold sm:text-3xl">Top Songs</h1>
        </div>
        <div>
          <h1 className="text-4xl font-extrabold sm:text-3xl">Top Albums</h1>
        </div>
        <div>
          <h1 className="text-4xl font-extrabold sm:text-3xl">Playlists</h1>
        </div>
      </div>
    </div>
  );
};

export default Stats;
