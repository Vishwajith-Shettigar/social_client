import React from 'react'
import "./topbar.css"
import { Chat, NotificationAdd, Person, Search } from '@mui/icons-material'
import NotificationsIcon from '@mui/icons-material/Notifications';
function Topbar() {
  return (
    <div className='topbarContainer'>


      <div className="topbarleft">

        <span className='logo'>Dont befraid</span>

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

            <Chat/>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbariconItem">

            <NotificationsIcon/>
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src="./assets/person/1.jpeg" alt="" className="topbarImage" />
      </div>
    </div>

  )
}

export default Topbar