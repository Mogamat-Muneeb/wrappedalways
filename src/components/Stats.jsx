import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const  Stats = (props) =>{

 
  if (!props.userData) {
    return <div>Loading...</div>;
  }
  return (
    <div >

<div className='mt-10 text-[#1c1c1c] max-w-[1285px] mx-auto w-full'>
      <Link target="_blank"  to={`https://open.spotify.com/user/${props.userData.id}`}>   Logo spotify   open in Spotiy </Link>

    <div>
      <h1 className='text-4xl font-extrabold sm:text-3xl'>Top Genres</h1>
      </div>
      <div>
      <h1 className='text-4xl font-extrabold sm:text-3xl'>Top Artists</h1>
      </div>
      <div>
      <h1 className='text-4xl font-extrabold sm:text-3xl'>Top Songs</h1>
      </div>
      <div>
      <h1 className='text-4xl font-extrabold sm:text-3xl'>Top Albums</h1>
      </div>
      <div>
      <h1 className='text-4xl font-extrabold sm:text-3xl'>Playlists</h1>
      </div>
</div>
    </div>
  )
}

export default Stats