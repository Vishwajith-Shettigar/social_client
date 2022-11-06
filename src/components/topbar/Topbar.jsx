import React, { useContext ,useEffect} from 'react'
import "./topbar.css"
import { Chat, Handyman, HandymanTwoTone, NotificationAdd, Person, Search } from '@mui/icons-material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import {globalinfo} from '../../App'
function Topbar({removeCookie}) {

  const {mobile,setShowSidebar,showSidebar}=useContext(globalinfo)
  const {user}=useContext(AuthContext)
const PF=process.env.REACT_APP_PUBLIC_FOLDER;
useEffect(()=>{
  console.log(mobile)
},[mobile])

if(user)
  return (
    <div className='topbarContainer'>


      <div className="topbarleft">

        {   
        mobile&&
       <MenuIcon onClick={()=>{setShowSidebar(!showSidebar)}}/>

        }
<Link to={"/"}style={{textDecoration:"none"}} >
        <span className='logo'>Dont befraid</span>
</Link>
      </div>
      <div className="topbarcenter">

        {
          
          (mobile===false)&&<div className="searchbar">
<Search className='searchIcon'/>
<input placeholder='search ' className="searchInput" />
        </div>
        
        }
      </div>
      <div className="topbarright">


        <div className="topbarlinks">

          <span className='topbarlink' onClick={()=>{ removeCookie(["userId"]); window.location.reload();}}>log out</span>
         

        </div>
        <div className="topbaricons">
          
          <div className="topbariconItem">
<Link to="/messenger" style={{color:"white", textDecoration:"none"}}>
    <Chat/>
</Link>
          
            <span className="topbarIconBadge">1</span>
          </div>
          
        </div>
        <Link to={`/profile/${user.username}`}>
         <img src={user.profilePicture ? PF+"/person/"+user.profilePicture:PF+"/person/noAvatar.png"} alt="" className="topbarImage" />
        </Link>
       
      </div>
    </div>

  )
}

export default Topbar