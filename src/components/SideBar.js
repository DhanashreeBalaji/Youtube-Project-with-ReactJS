import React from 'react'
import { useSelector } from 'react-redux'

const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  // Early Return
  if(!isMenuOpen) return null;

  return (
    <div className='p-5 shadow-lg col-span-1'>
    
    <ul>
      <li>Home</li>
      <li>Shorts</li>
      <li>Subscriptions</li>
      
    </ul>
     <h1>You</h1>
    <ul>
      <li>Your channel</li>
      <li>Subscription</li>
      <li>Playlists</li>
      <li>Your videos</li>
      <li>Watch Later</li>
      <li>Liked videos</li>
    </ul>
    <h1>Subscriptions</h1>
    <ul>
      <li>Music</li>
      <li>Sports</li>
      <li>Gaming</li>
      <li>Movies</li>
    </ul>
    </div>
  )
}

export default SideBar