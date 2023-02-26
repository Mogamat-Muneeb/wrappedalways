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
  const [showing, setShowing] = useState("Top Genres");

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

  console.log("playlist inside ", playlist);

  // Get Current Top Genres long term
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

  // console.log("TOp genres", topGenres);

  // Get Current Top Albums long term

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

    // Get Current Top Artist long term
  useEffect(() => {
    fetch(
      "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10&offset=5",
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setArtist(data.items));
  }, [props.token]);

  console.log(artist, "artist");

  if (!userData || !artist || !album || !playlist || !tracks || !topGenres) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div class="flex space-x-2">
          <div aria-label="Loading..." role="status">
            <svg class="h-7 w-7 animate-spin" viewBox="3 3 18 18">
              <path
                class="fill-[#22c55e]"
                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
              ></path>
              <path
                class="fill-[#f3f4f6]"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="flex items-center justify-center h-full md:mt-10 mt-14 ">
        <div className="md:flex hidden w-full  max-w-[1220px] mx-auto justify-center md:gap-0 gap-2 z-40  h-14 shadow-sm  fixed md:top-12  top-24 bg-white items-center px-2 rounded-md ">
          <div
            className={`cursor-pointer md:text-[20px] text-[14px] font-semibold bg-transparent flex items-center w-full h-14   ${showing === "Top Genres" && "font-bold text-[#22c55e] transition-all duration-150 "}`}
            onClick={() => setShowing("Top Genres")}
          >
           Top  Genres
          </div>
          <div
            className={`cursor-pointer  md:text-[20px] text-[14px] font-semibold bg-transparent w-full  flex items-center  h-14 ${
              showing === "Top Artists" && "font-bold text-[#22c55e] transition-all duration-150"
            }`}
            onClick={() => setShowing("Top Artists")}
          >
           Top  Artists
          </div>
          <div
            className={`cursor-pointer  md:text-[20px] text-[14px] font-semibold bg-transparent w-full  flex items-center h-14 ${showing === "Top Tracks" && "font-bold text-[#22c55e] transition-all duration-150"}`}
            onClick={() => setShowing("Top Tracks")}
          >
            Top Tracks
          </div>
          <div
            className={`cursor-pointer  md:text-[20px] text-[14px] font-semibold bg-transparent w-full  flex items-center h-14 ${
              showing === "Top Playlists" && "font-bold text-[#22c55e] transition-all duration-150"
            }`}
            onClick={() => setShowing("Top Playlists")}
          >
            Playlists
          </div>
        </div>
        <div className="fixed z-40 flex items-center justify-center w-full gap-2 px-1 rounded-sm shadow-sm bg-whitemd:hidden md:gap-0 h-14 md:top-12 top-24 ">
          <div
            className={`cursor-pointer  text-[14px] font-medium bg-transparent flex items-center justify-center w-full  h-14   ${showing === "Top Genres" && "font-bold text-[#22c55e] transition-all duration-150 "}`}
            onClick={() => setShowing("Top Genres")}
          >
           Top  Genres
          </div>
          <div
            className={`cursor-pointer  text-[14px]  font-medium bg-transparent   flex items-center  justify-center w-full h-14 ${
              showing === "Top Artists" && "font-bold text-[#22c55e] transition-all duration-150"
            }`}
            onClick={() => setShowing("Top Artists")}
          >
           Top  Artists
          </div>
          <div
            className={`cursor-pointer   text-[14px]  font-medium bg-transparent  flex items-center justify-center w-full h-14 ${showing === "Top Tracks" && "font-bold text-[#22c55e] transition-all duration-150"}`}
            onClick={() => setShowing("Top Tracks")}
          >
            Top Tracks
          </div>
          <div
            className={`cursor-pointer   text-[14px]  font-medium bg-transparent   flex items-center  justify-center w-full h-14 ${
              showing === "Top Playlists" && "font-bold text-[#22c55e] transition-all duration-150"
            }`}
            onClick={() => setShowing("Top Playlists")}
          >
            Playlists
          </div>
        </div>
      <div className="w-full px-2 md:mt-10 mt-3 max-h-[700px] overflow-x-auto   md:px-0">
        <div className="flex flex-col gap-10 mt-10  max-w-[1220px]  mx-auto   ">
          {showing === "Top Genres" && (
            <>
              <div id="Genres">
                {/* <h1 className="text-3xl font-extrabold">Your Top Genres</h1> */}
                {topGenres.length ? (
                  <div className="flex flex-col gap-3 pt-5">
                    {topGenres.map((item, index) => {
                      return (
                        <div key={item.id}>
                          <h2 className="flex">
                            <span className="text-[#9ca3af] mr-2">{index + 1}</span>
                            <span className=""> {item}</span>
                          </h2>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="pt-5">
                    You do not have any Top Genres at the moment !!
                  </div>
                )}
              </div>
            </>
          )}

          {showing === "Top Artists" && (
            <>
              <div id="Artists">
                {/* <h1 className="text-3xl font-extrabold ">Your Top Artists</h1> */}
                {artist.length === 0 && (
                  <div>you dont have any top artist yet</div>
                )}
                <div className="flex flex-col gap-6 pt-5">
                {artist?.map((item, index) => {
                  console.log(item.images[2], "item yes ma§");
                  return (
                    <div key={item.id}>
                        <div className="flex items-center gap-2">
                          <span className="text-[#9ca3af]">{index + 1}</span>
                         <img src={item.images[2].url} alt="" className="relative w-10 h-10 bg-cover rounded shadow-xl" />
                          <span className="font-medium ">{item.name}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 pt-2 pl-4">
                      {item?.genres.map((value, index) => {
                        return (
                          <div key={value.id} >
                              <h2 className="flex items-center justify-center gap-2 ">
                              {/* <span>  {!index == 0  && value.length &&  "•"}</span> */}
                                <span className=" font-light rounded px-2 py-0.5 mr-2 mt-1 text-gray-400 border border-gray-400 text-sm">{value}  </span>
                            </h2>
                          </div>
                        );
                      })}
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            </>
          )}

          {showing === "Top Tracks" && (
            <>
              <div id="Tracks">
                <div className="flex flex-col gap-2">
                  {tracks.length === 0 && (
                    <div>You dont have any Top Tracks yet!</div>
                  )}
                  <div className="flex flex-col gap-6 pt-5">
                  {tracks.map((item, index) => {
                    console.log(item, "item in tracks");
                    return (
                      <div key={item.id}>
                        <div className="flex flex-col gap-2 ">
                            <h2>
                              <span  className="text-[#9ca3af] pr-2"> {index + 1}</span>
                              <span className="font-medium">{item.name}</span>
                           </h2>
                          <div className="flex flex-wrap gap-2 pl-2 text-sm text-gray-200">
                              {item.artists.map((value, index) => (
                                <div key={value.id} className="">
                                  <p className="flex items-center justify-center gap-[5px]">
                                    <span> {index > 0 && "•"}</span>
                                   <span className="text-sm font-light">{value.name}</span>
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                </div>
              </div>
            </>
          )}

          {showing === "Top Playlists" && (
            <>
              <div id="Playlists" className="pt-5 mb-10">
                {/* <h1 className="text-3xl font-extrabold ">Your Playlists</h1> */}
                <div>
                  {playlist.length === 0 && (
                    <div>you dont have any Playlists yet</div>
                  )}
                  <span>
                    You have{" "}
                    {playlist.total > 1
                      ? `${playlist.total} playlists`
                      : `${playlist.total} playlist`}
                  </span>
                  <div className="flex flex-wrap grid-cols-5 gap-4 pt-10 md:grid">
                  {playlist.items?.map((item, index) => {
                    return (
                      <div key={item.id}>
                        <div className="pb-5 ">
                        <h2 className="pb-5">
                            <span className="text-[#9ca3af] pr-2">{index + 1} </span>
                            <span>{item.name}</span>
                        </h2>
                          {item?.images.map((value, index) => {

                            return (
                              <div key={value.id}>
                                <div className="">
                                <img src={value.url}  className="relative w-56 h-56 bg-cover rounded shadow-xl" alt="" />
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
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Stats;
