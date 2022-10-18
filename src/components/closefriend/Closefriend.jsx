import React from 'react'
import "./closefriend.css"
function Closefriend({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <li className="sidebarfriend">
    <img className='sidebarfriendimg' src={PF+user.profilePicture}/>
    <span className='sidebarfriendname'> {user.username}</span>
</li>
  )
}

export default Closefriend

