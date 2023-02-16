import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Stats = (props) => {
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [album, setAlbums] = useState([]);
  const [userData, setUserData] = useState(null);

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
        const sortedTracks = data.items.sort(
          (a, b) => b.popularity - a.popularity
        );
        setTracks(sortedTracks);
      });
  }, [props.token]);

  // console.log("tracks inside ", tracks);

  // Get Current User’s Playlists
  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/playlists?limit=10&offset=0", {
      headers: {
        Authorization: `Bearer  ${props.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPlaylist(data));
  }, [props.token]);

  // console.log("playlist inside ", playlist);

  // Get Current Top Genres
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

  // console.log("TOp genres", topGenres)

  // Get Current Top Albums

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
        setAlbums(data.items);
      });
  }, [props.token]);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, [props.token]);



  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen ">
     <div class="flex space-x-2">
  <div aria-label="Loading..." role="status">
    <svg class="h-7 w-7 animate-spin" viewBox="3 3 18 18">
      <path
        class="fill-[#14c4e1]"
        d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
      <path
        class="fill-gray-800"
        d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
    </svg>
  </div>
</div>
</div>
    );
  }

  // console.log("Top album", album)


  return (
    <div>
      <div className="mt-32 text-[#1c1c1c] max-w-[1285px] mx-auto w-full md:px-0 px-2">
        <div className="flex justify-between">
          <div className="flex items-end gap-10">
            <img
              src={userData.images[0].url}
              alt="Profile"
              className="w-40 h-40 border-white rounded-full border-[3px] bg-[url('https://i.postimg.cc/MGrqp8xj/Group-5.jpg)] "
            />
            {/* <img src="https://i.postimg.cc/MGrqp8xj/Group-5.jpg" alt="" /> */}
            <p className="text-3xl font-extrabold">
              {userData.display_name}
            </p>
          </div>
          <div className="flex flex-col items-end justify-start">
            <div className="flex gap-2 hover:text-[#14c4e1] font-bold">
            <Link
              target="_blank"
              className="hover:text-[#14c4e1] flex gap-2"
              to={`https://open.spotify.com/user/${userData.id}`}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-6 h-6 fill-current"
            >
              <g>
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill-rule="nonzero"
                  d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.55 2 12 2zm3.75 14.65c-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85-.2.3-.55.4-.85.2zm1-2.7c-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.2 1s-.7.5-1.05.25zM6.3 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25C14.7 9 9.35 8.8 6.3 9.75z"
                ></path>
              </g>
            </svg>
              Logo spotify open in Spotiy
            </Link>
            </div>
            <div>
            <p>{userData.followers.total} Followers</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div id="Genres">
            <h1 className="text-3xl font-extrabold">Top Genres</h1>
          </div>
          <div id="Artists">
            <h1 className="text-3xl font-extrabold ">Top Artists</h1>
          </div>
          <div id="Songs">
            <h1 className="text-3xl font-extrabold ">Top Songs</h1>
          </div>
          <div id="Albums">
            <h1 className="text-3xl font-extrabold ">Top Albums</h1>
          </div>
          <div id="Playlists">
            <h1 className="text-3xl font-extrabold ">Playlists</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
