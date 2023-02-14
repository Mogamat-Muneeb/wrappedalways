import React from 'react'

const Landing = (props) => {

    // top artist in general
    // fetch('https://api.spotify.com/v1/browse/new-releases?limit=10', {
    //     headers: {
    //       'Authorization': `Bearer ${props.token}`
    //     }
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       const topArtists = data.albums.items.map(album => ({
    //         name: album.artists[0].name,
    //         image: album.artists[0].images[0].url
    //       }));
    //       console.log(topArtists, "top on landning");
    //     });
      

  return (
    <div>
      landing page 
    </div>
  )
}
export default Landing
