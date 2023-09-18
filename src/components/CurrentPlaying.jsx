// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CurrentPlaying = (props) => {
//   const [currentSong, setCurrentSong] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!props.token) return;

//     const fetchCurrentSong = () => {
//       const headers = {
//         Authorization: `Bearer ${props.token}`,
//       };

//       axios
//         .get("https://api.spotify.com/v1/me/player/currently-playing", {
//           headers,
//         })
//         .then((response) => {
//           const trackName = response.data.item?.name;
//           const artistName = response.data.item?.artists[0].name;
//           const albumName = response.data.item?.album.name;
//           const albumCover = response.data.item?.album.images[0].url;

//           setCurrentSong({ trackName, artistName, albumName, albumCover });
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching current song: ", error);
//           setIsLoading(false);
//         });
//     };

//     fetchCurrentSong();

//     const intervalId = setInterval(fetchCurrentSong, 3000);

//     return () => clearInterval(intervalId);
//   }, [props.token]);

//   return (
//     <div className="w-full max-w-[1220px] mx-auto">
//       <div className="flex w-full max-w-[1220px] mx-auto justify-center md:gap-0 gap-2 z-40 h-14 shadow-sm fixed md:bottom-12 bottom-24 bg-[#22c55e] items-center px-2 rounded-md">
//         {isLoading ? (
//           "Loading..."
//         ) : currentSong ? (
//           <div className="flex gap-4">
//             <div className="flex flex-col">
//               <p className="font-bold text-white">{currentSong.trackName}</p>
//               <p className="text-white font-medium text-[13px]">
//                 {currentSong.albumName} / {currentSong.artistName}
//               </p>
//             </div>
//             <div>
//               <img
//                 src={currentSong.albumCover}
//                 alt=""
//                 className="object-cover w-12 h-12 rounded-md"
//               />
//             </div>
//           </div>
//         ) : (
//           <div className="">
//             <p>Nothing is playing at the moment</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CurrentPlaying;

import React, { useEffect, useState } from "react";
import axios from "axios";

const CurrentPlaying = (props) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!props.token) return;

    const fetchCurrentSong = async () => {
      const headers = {
        Authorization: `Bearer ${props.token}`,
      };

      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          { headers }
        );
        const trackName = response.data.item?.name;
        const artistName = response.data.item?.artists[0].name;
        const albumName = response.data.item?.album.name;
        const albumCover = response.data.item?.album.images[0].url;

        setCurrentSong({ trackName, artistName, albumName, albumCover });
      } catch (error) {
        console.error("Error fetching current song: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentSong();
    const intervalId = setInterval(fetchCurrentSong, 3000);

    return () => clearInterval(intervalId);
  }, [props.token]);

  if (isLoading) {
    return (
      <div className="w-full max-w-[1220px] mx-auto">
        <div className="flex w-full max-w-[1220px] mx-auto justify-center md:gap-0 gap-2 z-40 h-14 shadow-sm fixed md:bottom-12 bottom-24 bg-[#22c55e] items-center px-2 rounded-md">
          Loading...
        </div>
      </div>
    );
  }

  if (!currentSong) {
    return null;
  }

  return (
    <div className="w-full max-w-[1220px] mx-auto flex justify-center items-center">
      <div className="md:flex hidden w-full max-w-[1220px] mx-auto justify-center md:gap-0 gap-2 z-40 h-14 shadow-sm fixed md:bottom-12 bottom-24 bg-[#22c55e] items-center px-2 rounded-md">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <p className="font-bold text-white">{currentSong.trackName}</p>
            <p className="text-white font-medium text-[13px]">
              {currentSong.albumName} / {currentSong.artistName}
            </p>
          </div>
          <div>
            <img
              src={currentSong.albumCover}
              alt=""
              className="object-cover w-12 h-12 rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="fixed z-40 flex items-center justify-center max-w-[400px] mx-auto w-full gap-2 px-1 bg-[#22c55e] rounded-sm shadow-sm md:hidden md:gap-0 max-h-[150px] h-full py-2 md:bottom-12 bottom-24">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <p className="font-bold text-[16px] text-white">
              {currentSong.trackName}
            </p>
            <p className="text-white font-medium text-[13px]">
              {currentSong.albumName} / {currentSong.artistName}
            </p>
          </div>
          <div>
            <img
              src={currentSong.albumCover}
              alt=""
              className="object-cover w-12 h-12 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlaying;
