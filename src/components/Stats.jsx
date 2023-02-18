import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Stats = (props) => {
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [album, setAlbums] = useState([]);
  const [userData, setUserData] = useState(null);
  const [artist, setArtist] = useState(null);

  // Get User’s Top Items
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
      "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10",
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

  console.log("TOp genres", topGenres);

  // Get Current Top Albums

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
        setAlbums(data.items);
      });
  }, [props.token]);

  // console.log("albums", album);
  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, [props.token]);

  
  useEffect(() => {
    fetch(
      "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=5",
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setArtist(data.items));
  }, [props.token]);

  // console.log(artist, "artist");

  if (!userData || !artist || !album || !playlist || !tracks || !topGenres) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div class="flex space-x-2">
          <div aria-label="Loading..." role="status">
            <svg class="h-7 w-7 animate-spin" viewBox="3 3 18 18">
              <path
                class="fill-[#14c4e1]"
                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
              ></path>
              <path
                class="fill-gray-800"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // console.log("Top album", album)

  return (
    <div className="h-full ">
      <div className="w-full px-2 pt-10 md:px-0">
        <div className="flex flex-col gap-10 mt-10 max-w-[1285px] mx-auto  ">
          <div id="Genres">
            <h1 className="text-3xl font-extrabold">Top Genres</h1>
            {topGenres.length ?  (
            <div className="flex w-1/2 gap-3 pt-5">
              {topGenres.map((item)=>{
                return (
                  <div key={item.id}>
                     <span className="px-3.5 py-2 bg-[#171a20]  text-white shadow-xl text-sm tracking-wide rounded-full lowercase external-text hover:bg-gray-400"> {item}</span>
                  </div>
                )
              })}
            </div>
            ):(
              <div className="pt-5">
                You do not have any Top Genres at the moment !!
                </div>
            )
         }
          </div>
          <div id="Artists">
            <h1 className="text-3xl font-extrabold ">Top Artists</h1>
            {artist.length === 0 && <div>you dont have any top artist yet</div>}
            {artist?.map((item) => {
              return (
                <div key={item.id}>
                  <div className="flex gap-2">
                    <p>{item.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div id="Songs">
            <h1 className="text-3xl font-extrabold ">Top Songs</h1>
            <div className="flex flex-col gap-2">
              {tracks.length === 0 && (
                <div>you dont have any Top Songs yet</div>
              )}
              {tracks.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="flex gap-2">
                      <p>{item.name}</p>
                      <div className="flex gap-2 text-[12px] text-gray-200">
                        {item.artists.map((value) => (
                          <div key={value.id}>
                            <p>{value.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div id="Playlists">
            <h1 className="text-3xl font-extrabold ">Playlists</h1>
            <div>
              {playlist.length === 0 && (
                <div>you dont have any Playlists yet</div>
              )}
              {playlist.total}
              {playlist.items?.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="flex gap-2">
                      <p>{item.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
