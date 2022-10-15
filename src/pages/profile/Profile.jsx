import React from 'react'
import "./profile.css"
import Topbar  from "../../components/topbar/Topbar"
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';

function Profile() {
  return (
    <>
    <Topbar/>
    <div className='profile'>
 
    
    <Sidebar/>

    <div className="profileRight">

      <div className="profileRightTop">
<div className="profileCover">
  <img className='profileCoverImg' src='assets/post/3.jpg'/>
        
        <img className='profileUserImg' src='assets/person/1.jpeg'/>
</div>
<div className="profileInfo">
  <h4 className='profileInfoName'>Dark</h4>
  <span className='profileInfoDesc'>Hello my self  dark</span>
</div>
        
      </div>
      <div className="profileRightBottom">
        <Feed/>
    <Rightbar profile/>
      </div>
    </div>
    
    </div>
 </>
  )
}

export default Profile