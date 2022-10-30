import React from 'react'
import "./closefriend.css"
import {Link} from 'react-router-dom'
function Closefriend({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <Link style={{textDecoration: "none", color:"black" }} to={`/profile/${user.username}`}>
       <li className="sidebarfriend">
    <img className='sidebarfriendimg' src={user.profilePicture? PF+"/person/"+user.profilePicture: PF+"/person/noAvatar.png"}/>
    <span className='sidebarfriendname'> {user.username}</span>
</li>
    </Link>
   
  )
}

export default Closefriend

