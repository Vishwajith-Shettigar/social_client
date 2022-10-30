import React from 'react'
import "./online.css"
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
function Online({userOnline}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
const [user,setUser]=useState();
  useEffect(()=>{
 
    const getOnlineUsers=async()=>{
 const res=await axios.get("/user?userid="+userOnline);
 setUser(res.data)

    }
   getOnlineUsers();

  },[userOnline])
  if(user)
  return (
    <Link style={{textDecoration:"none"}} to={`/profile/${user.username}`}>
        <li className="rightbarFriend">
    <div className="rightbarProfileImgContainer">
     <img src={user.profilePicture? PF+"/person/"+user.profilePicture: PF+"/person/noAvatar.png"} alt="" className="rightbarProfileImg" />
     <span className="rightbarOnline"></span>
    </div>
 <span className="rightbarUsername">{user.username}</span>
 
     </li>
  
    </Link>
  )
}

export default Online