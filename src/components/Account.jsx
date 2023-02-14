import React, { useEffect, useState } from 'react'

export default function Account(props) {

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

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-[100px]'> 
      Account
      Welcome, {userData.display_name}!
    </div>
  )
}
