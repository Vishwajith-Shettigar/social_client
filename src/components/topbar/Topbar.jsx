import React, { useContext } from 'react'
import "./topbar.css"
import { Chat, NotificationAdd, Person, Search } from '@mui/icons-material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
function Topbar() {

  const {user}=useContext(AuthContext)
const PF=process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='topbarContainer'>


      <div className="topbarleft">
<Link to={"/"}style={{textDecoration:"none"}} >
        <span className='logo'>Dont befraid</span>
</Link>
      </div>
      <div className="topbarcenter">
        <div className="searchbar">
<Search className='searchIcon'/>
<input placeholder='search ' className="searchInput" />
        </div>
      </div>
      <div className="topbarright">


        <div className="topbarlinks">

          <span className='topbarlink'>Homepage</span>
          <span className='topbarlink'>Timeline</span>

        </div>
        <div className="topbaricons">
          <div className="topbariconItem">

            <Person/>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbariconItem">
<Link to="/messenger" style={{color:"white", textDecoration:"none"}}>
    <Chat/>
</Link>
          
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbariconItem">

            <NotificationsIcon/>
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
         <img src={user.profilePicture ? PF+"/person/"+user.profilePicture:PF+"person/noAvatar.png"} alt="" className="topbarImage" />
        </Link>
       
      </div>
    </div>

  )
}

export default Topbar