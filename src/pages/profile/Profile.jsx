import React from 'react'
import "./profile.css"
import { useState } from 'react';
import { useEffect } from 'react';
import Topbar  from "../../components/topbar/Topbar"
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import axios from 'axios'
import { useParams } from 'react-router-dom';
function Profile() {

  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
const params=useParams();
  const [user,setUser]=useState({});

  useEffect( ()=>{
    
  const fetchUser=async()=>{
   
  const res=  await axios.get(`/user?username=${params.username}`)
  
    setUser(res.data);
   
   
  }
    
  fetchUser();
  
  },[params.username])

  return (
    <>
    <Topbar/>
    <div className='profile'>
 
    
    <Sidebar/>

    <div className="profileRight">

      <div className="profileRightTop">
<div className="profileCover">
  <img className='profileCoverImg' src={user.coverPicture || PF+"person/noCover.png"}/>
        
        <img className='profileUserImg' src={user.profilePicture || PF+"person/noAvatar.png"}/>
</div>
<div className="profileInfo">
  <h4 className='profileInfoName'>{user.username}</h4>
  <span className='profileInfoDesc'>{user.desc}</span>
</div>
        
      </div>
      <div className="profileRightBottom">
        <Feed username={params.username}/>
    <Rightbar user={user}/>
      </div>
    </div>
    
    </div>
 </>
  )
}

export default Profile