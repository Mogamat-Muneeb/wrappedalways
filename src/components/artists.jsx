import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../elements/Icons";

const Artists = (props) => {
  const [userData, setUserData] = useState(null);
  const [artist, setArtist] = useState(null);
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

  if (!userData || !artist) {
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
      {artist.length === 0 && <div>you dont have any top artist yet</div>}
      <div className="flex flex-col gap-6 pt-5">
        {artist?.map((item, index) => {
          return (
            <div key={item.id}>
              <div className="flex items-center gap-2">
                <span className="text-[#9ca3af]">{index + 1}</span>
                <img
                  src={item.images[2].url}
                  alt=""
                  className="relative w-10 h-10 bg-cover rounded shadow-xl"
                />
                <span className="font-medium ">{item.name}</span>
              </div>
              <div className="flex flex-wrap items-center gap-1 pt-2 pl-4">
                {item?.genres.map((value, index) => {
                  return (
                    <div key={value.id}>
                      <h2 className="flex items-center justify-center gap-2 ">
                        {/* <span>  {!index == 0  && value.length &&  "•"}</span> */}
                        <span className=" font-light rounded px-2 py-0.5 mr-2 mt-1 text-gray-400 border border-gray-400 text-sm">
                          {value}{" "}
                        </span>
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
  );
};

export default Artists;
