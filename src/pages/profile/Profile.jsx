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
    // line changes

    if(params.username=="anonymous"){

    }
    else{
  const fetchUser=async()=>{
   
  const res=  await axios.get(`/user?username=${params.username}`)
  
    setUser(res.data);
   
   
  }
    
  fetchUser();
}
  },[params.username])

  return (
    <>
    <Topbar/>
    <div className='profile'>
 
    
    <Sidebar/>

    <div className="profileRight">

      <div className="profileRightTop">
<div className="profileCover">
  <img className='profileCoverImg' src={params.username=="anonymous"?PF+"/person/noCover.png": user.coverPicture? PF+"/person/"+user.coverPicture: PF+"/person/noCover.png"}/>
        
        <img className='profileUserImg' src={params.username=="anonymous"?PF+"/person/noAvatar.png":  user.profilePicture? PF+"/person/"+user.profilePicture : PF+"/person/noAvatar.png"}/>
</div>
<div className="profileInfo">
  <h4 className='profileInfoName'>{params.username=="anonymous"?"Anonymous":user.username}</h4>
  <span className='profileInfoDesc'>{params.username=="anonymous"?"Hey am anonymous i am little shy about to share my story thats why, hope you understand <3":user.desc}</span>
</div>
        
      </div>
     {/* line chnages */}
     {
      params.username=="anonymous"?<></>:
     <div className="profileRightBottom">
        <Feed username={params.username}/>
    <Rightbar user={user}/>
      </div>}
    </div>
    
    </div>
 </>
  )
}

export default Profile