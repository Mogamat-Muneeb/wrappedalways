import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function GenreInfo(props) {
  const { name } = useParams();
  const [selectedGenre, setSelectedGenre] = useState(name);
  const [genreDetails, setGenreDetails] = useState(null);

  useEffect(() => {
    if (selectedGenre) {
      fetch(
        `https://api.spotify.com/v1/search?q=${selectedGenre}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setGenreDetails({
            artists: data.artists.items,
          });
        });
    }
  }, [selectedGenre, props.token]);

  return (
    <div>
      GenreInfo
      <p>{name}</p>
      {genreDetails && (
        <div>
          {/* Render additional information about the selected genre */}
          {/* For example, you can display artists, popular songs, albums, and playlists here */}
        </div>
      )}
    </div>
  );
}
