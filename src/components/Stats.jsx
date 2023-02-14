import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const  Stats = (props) =>{

 

  return (
    <div>

      <Link target="_blank"  to={`https://open.spotify.com/user/${props.userData.id}`}>   Logo spotify   open in Spotiy </Link>


  <div>
      <h1>Top Genres</h1>
      </div>
      <div>
      <h1>Top Artists</h1>
      </div>
      <div>
      <h1>Top Songs</h1>
      </div>
      <div>
      <h1>Top Albums</h1>
      </div>
      <div>
      <h1>Playlists</h1>
      </div>
    </div>
  )
}

export default Stats