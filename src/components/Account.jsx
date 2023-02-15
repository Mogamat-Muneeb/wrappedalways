import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

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
    return <div className='flex items-center justify-center h-screen'>Loading...</div>;
  }

  return (
    <div className='mt-10 text-[#1c1c1c] max-w-[1285px] mx-auto w-full md:px-0 px-2 '>
      <div className='flex flex-col items-start justify-center w-full h-full '>
      <h1 className='text-5xl font-extrabold'>Spotify Account</h1>
      <p className='font-normal text-[16px]'>The Spotify account that you're signed in with.</p>
      </div>
      <div>
      <h2 className='text-4xl font-extrabold sm:text-3xl'>Username:</h2>
      <Link  target="_blank"
          to={`https://open.spotify.com/user/${userData.id}`}>{userData.id}</Link>

      </div>
      <div>
      <h2 className='text-4xl font-extrabold sm:text-3xl'>Email:</h2>
      <p>The email address associated with your account.</p>
      <p>{userData.email}</p>
      <h2 className='text-4xl font-extrabold sm:text-3xl'>Display Name:</h2>
      <p>  {userData.display_name}</p>

      </div>

      <div>
      <h2 className='text-4xl font-extrabold sm:text-3xl'>Plan:</h2>
      <p>Your spotify plan at the current moment</p>
      <p>  {userData.product}</p>
      </div>
      <div>
      <h2 className='text-4xl font-extrabold sm:text-3xl'>Sign Out</h2>
      <p>Sign out of your account on this browser.</p>
      <button onClick={props.logout}>Logout</button>
      </div>


     {/* {userData.display_name}! */}
     {/* {cleanedUserId} */}
     {/* <img src={userData.images[0].url} alt="Profile" /> */}
    </div>
  )
}
