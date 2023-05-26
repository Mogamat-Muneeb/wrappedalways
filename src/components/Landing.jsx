import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../elements/Icons";

const Landing = (props) => {
  // https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=artist&market=ES&limit=50&offset=5
  // console.log(props.token)
  // const [artist, setArtist] = useState(null);
  // console.log("🚀 ~ file: Landing.jsx:7 ~ Landing ~ artist", artist)
  // const [error, setError] = useState(null);
  // const [track, setTrack] = useState(null);

  // async function fetchData() {
  //   try {
  //     const response = await fetch('https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=artist&market=ES&limit=50&offset=5', {
  //       headers: {
  //         'Authorization': `Bearer ${props.token}`
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const data = await response.json();
  //     const artists = data.artists.items;

  //     if (artists.length === 0) {
  //       throw new Error('No artists found');
  //     }

  //     const storedArtist = JSON.parse(localStorage.getItem('artistOfTheDay'));

  //     if (storedArtist) {
  //       setArtist(storedArtist);
  //     } else {
  //       const index = Math.floor(Math.random() * artists.length);
  //       const selectedArtist = artists[index];
  //       localStorage.setItem('artistOfTheDay', JSON.stringify(selectedArtist));
  //       setArtist(selectedArtist);
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  //   const intervalId = setInterval(() => {
  //     fetchData();
  //   }, 24 * 60 * 60 * 1000);

  //   return function cleanup() {
  //     clearInterval(intervalId);
  //   }
  // }, []);

  const [artist, setArtist] = useState(null);
  const [error, setError] = useState(null);

  // async function fetchArtist() {
  //   try {
  //     const response = await fetch('https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=artist&market=ES&limit=50&offset=5', {
  //       headers: {
  //         'Authorization': `Bearer ${props.token}`
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const data = await response.json();
  //     const artists = data.artists.items;

  //     if (artists.length === 0) {
  //       throw new Error('No artists found');
  //     }

  //     const index = Math.floor(Math.random() * artists.length);
  //     const selectedArtist = artists[index];
  //     const artistObject = {
  //       artist: selectedArtist,
  //       updated: new Date().getTime() // save current timestamp as the updated date
  //     };
  //     localStorage.setItem('artistOfTheDay', JSON.stringify(artistObject));
  //     setArtist(selectedArtist);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // }

  // useEffect(() => {
  //   const storedArtist = JSON.parse(localStorage.getItem('artistOfTheDay'));
  //   if (storedArtist && (new Date().getTime() - storedArtist.updated < 24 * 60 * 60 * 1000)) {
  //     setArtist(storedArtist.artist);
  //   } else {
  //     fetchArtist();
  //   }
  // }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=artist&market=ES&limit=50&offset=5",
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const artists = data.artists.items;

      if (artists.length === 0) {
        throw new Error("No artists found");
      }

      const lastUpdate = localStorage.getItem("lastUpdate");
      const now = new Date();
      const oneDay = 24 * 60 * 60 * 1000;

      if (!lastUpdate || now - new Date(lastUpdate) > oneDay) {
        const index = Math.floor(Math.random() * artists.length);
        const selectedArtist = artists[index];
        localStorage.setItem("artistOfTheDay", JSON.stringify(selectedArtist));
        localStorage.setItem("lastUpdate", now);
        setArtist(selectedArtist);
      } else {
        const storedArtist = JSON.parse(localStorage.getItem("artistOfTheDay"));
        setArtist(storedArtist);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!artist) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div class="flex space-x-2">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h1>Artist of the Day: {artist.name}</h1>
      <img src={artist.images[0].url} alt={artist.name} />
      <p>{artist.followers.total} followers</p>
    </div>
  );
};

export default Landing;
