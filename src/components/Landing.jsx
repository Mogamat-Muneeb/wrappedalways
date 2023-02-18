import React, { useEffect, useState } from 'react'

const Landing = (props) => {
  // https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=artist&market=ES&limit=50&offset=5
console.log(props.token)
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

async function fetchArtist() {
  try {
    const response = await fetch('https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=artist&market=ES&limit=50&offset=5', {
      headers: {
        'Authorization': `Bearer ${props.token}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const artists = data.artists.items;

    if (artists.length === 0) {
      throw new Error('No artists found');
    }

    const index = Math.floor(Math.random() * artists.length);
    const selectedArtist = artists[index];
    const artistObject = {
      artist: selectedArtist,
      updated: new Date().getTime() // save current timestamp as the updated date
    };
    localStorage.setItem('artistOfTheDay', JSON.stringify(artistObject));
    setArtist(selectedArtist);
  } catch (error) {
    setError(error.message);
  }
}

useEffect(() => {
  const storedArtist = JSON.parse(localStorage.getItem('artistOfTheDay'));
  if (storedArtist && (new Date().getTime() - storedArtist.updated < 24 * 60 * 60 * 1000)) {
    setArtist(storedArtist.artist); // use the stored artist if it was updated within the last 24 hours
  } else {
    fetchArtist(); // fetch a new artist if the stored artist is more than 24 hours old or doesn't exist
  }
}, []);





if (error) {
  return <div>Error: {error}</div>;
}

if (!artist) {
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
)
}



return (
  <div className='mt-10'>
    <h1>Artist of the Day: {artist.name}</h1>
    <img src={artist.images[0].url} alt={artist.name} />
    <p>{artist.followers.total} followers</p>
  </div>
);
}

export default Landing
