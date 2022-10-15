import React from 'react'
import "./closefriend.css"
function Closefriend({user}) {
  return (
    <li className="sidebarfriend">
    <img className='sidebarfriendimg' src={user.profilePicture}/>
    <span className='sidebarfriendname'> {user.username}</span>
</li>
  )
}

export default Closefriend

