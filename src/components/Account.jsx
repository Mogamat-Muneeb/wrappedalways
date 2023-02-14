import React, { useEffect, useState } from 'react'

export default function Account(props) {
console.log("props.token", props.token)
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${props.token}`
      }
    })
      .then(response => response.json())
      .then(data => setUserData(data));
      
  }, [props.token]);
  console.log("someting user", userData);

  // const userId = userData.uri
//   const cleanedUserId = userId.replace('spotify:user:', '');
// console.log("cleaning user", cleanedUserId)

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-10 text-[#1c1c1c] max-w-[1285px] mx-auto w-full '>
      <div className='flex flex-col items-start justify-center w-full h-full '>
      <h1 className='text-5xl font-extrabold'>Spotify Account</h1>
      <p className='font-normal text-[16px]'>The Spotify account that you're signed in with.</p>
      </div>
      <div>
      <h2 className='text-3xl font-extrabold'>Username:</h2>
      <p>{userData.id}</p>

      </div>
      <div>
      <h2 className='text-3xl font-extrabold'>Display Name:</h2>
      <p>  {userData.display_name}</p>
      </div>
      <div>
      <h2 className='text-3xl font-extrabold'>Sign Out</h2>
      <button onClick={props.logout}>Logout</button>
      </div>


     {/* {userData.display_name}! */}
     {/* {cleanedUserId} */}
     {/* <img src={userData.images[0].url} alt="Profile" /> */}
    </div>
  )
}
