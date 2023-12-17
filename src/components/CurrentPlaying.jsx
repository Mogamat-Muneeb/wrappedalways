import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDevices } from "react-icons/md";

const CurrentPlaying = (props) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDevice, setActiveDevice] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleToggleVisibility = () => {
    setIsVisible((prevVisibility) => !prevVisibility);
  };

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

        const deviceResponse = await axios.get(
          "https://api.spotify.com/v1/me/player/devices",
          { headers }
        );

        const activeDevice = deviceResponse.data.devices.find(
          (device) => device.is_active
        ); // Find the active device
        setActiveDevice(activeDevice);
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

  // if (isLoading) {
  //   return (
  //     <div className="w-full max-w-[1220px] mx-auto">
  //       <div className="hidden w-full max-w-[1220px] mx-auto justify-center md:gap-0 gap-2 z-40 h-14 shadow-sm fixed md:bottom-12 bottom-24 bg-[#22c55e] items-center px-2 rounded-md">
  //         Loading...
  //       </div>
  //     </div>
  //   );
  // }

  // if (isLoading || !isVisible) {
  //   return (
  //     <div className="w-full max-w-[1220px] mx-auto">
  //       {/* ... (your loading or hidden content remains unchanged) */}
  //       <button className="btn" onClick={handleToggleVisibility}>
  //         Toggle Visibility
  //       </button>
  //     </div>
  //   );
  // }

  // if (!currentSong) {
  //   return null;
  // }

  return (
    <div
      className={` ${
        currentSong?.trackName
          ? "w-full max-w-[1220px] mx-auto flex justify-center lg:justify-end items-center"
          : "hidden"
      }`}
    >
      <div className="md:flex flex-col hidden w-full max-w-[400px] mx-auto justify-center md:gap-0 gap-2 z-40 h-[100px] shadow-sm fixed md:bottom-12 bottom-24  bg-[#22c55e]  items-center px-2 rounded-md">
        <div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              {/* <button onClick={handleToggleVisibility}> Close</button> */}
              <p className="font-semibold text-[14] lg:text-[16px] leading-4 pb-1 text-white max-w-[200px] w-full">
                {currentSong?.trackName}
              </p>
              <p className="text-white font-thin text-[13px] max-w-[400px] w-full flex items-center">
                {currentSong?.artistName} / {currentSong?.albumName}
              </p>
            </div>
            <div>
              <img
                src={currentSong?.albumCover}
                alt=""
                className="object-cover w-12 h-12 rounded-md"
              />
            </div>
          </div>
          {activeDevice ? (
            <p className="text-white text-[10px] flex gap-1">
              <MdDevices className="text-[16px] !fill-white" />{" "}
              {activeDevice?.name}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* MOBILE */}
      <div className="fixed z-40 flex items-center justify-center max-w-[400px] mx-auto w-full gap-2 px-1 bg-[#22C55ECC] rounded-sm shadow-sm md:hidden md:gap-0 max-h-[100px] h-full py-2 md:bottom-12 bottom-24">
        <div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <p className="font-semibold text-[14] lg:text-[16px] leading-4 pb-1 text-white max-w-[200px] w-full">
                {currentSong?.trackName}
              </p>
              <p className="text-white font-thin text-[13px] max-w-[300px] w-full flex items-center">
                {currentSong?.artistName} / {currentSong?.albumName}
              </p>
            </div>
            <div>
              <img
                src={currentSong?.albumCover}
                alt=""
                className="object-cover w-12 h-12 rounded-md"
              />
            </div>
          </div>
          {activeDevice ? (
            <p className="text-white text-[10px] flex gap-1">
              <MdDevices className="text-[16px] !fill-white " />
              {activeDevice?.name}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentPlaying;
