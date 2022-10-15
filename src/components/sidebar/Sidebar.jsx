import { Bookmark, Chat, Event, Group, HelpOutline, PlayArrow, PlayCircleFilledOutlined, RssFeed, Schedule, School, VideoCallRounded, VideoSettings, WorkOutline } from '@mui/icons-material'
import React from 'react'
import Closefriend from '../closefriend/Closefriend'
import "./sidebar.css"
import {Users} from "../../dummyData"
function Sidebar() {
    return (
        <div className='sidebar'>

            <div className="sidebarWrapper">
                <ul className="sidebarList">

                    <li className="sidebarListItem">

                        <RssFeed className='sidebarIcon' />
                        <span className='sidebarListItemText'>Feed</span>
                    </li>
                    <li className="sidebarListItem">

                        <Chat className='sidebarIcon' />
                        <span className='sidebarListItemText'>Chats</span>
                    </li>
                    <li className="sidebarListItem">

                        <PlayCircleFilledOutlined className='sidebarIcon' />
                        <span className='sidebarListItemText'>Videos</span>
                    </li>
                    <li className="sidebarListItem">

                        <Group className='sidebarIcon' />
                        <span className='sidebarListItemText'>Groups</span>
                    </li>
                    <li className="sidebarListItem">

                        <Bookmark className='sidebarIcon' />
                        <span className='sidebarListItemText'>Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">

                        <HelpOutline className='sidebarIcon' />
                        <span className='sidebarListItemText'>Questions</span>
                    </li>
                    <li className="sidebarListItem">

                        <WorkOutline className='sidebarIcon' />
                        <span className='sidebarListItemText'>Jobs</span>
                    </li>
                    <li className="sidebarListItem">

<Event className='sidebarIcon' />
<span className='sidebarListItemText'>Events</span>
</li>
<li className="sidebarListItem">

<School className='sidebarIcon' />
<span className='sidebarListItemText'>Courses</span>
</li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className='sidebarHr'/>
                <ur className="sidebarfriendList">
                  {

                    Users.map((u)=>(
                         <Closefriend key={u.id} user={u}/>
                    ))
                  }
                    
                </ur>
            </div>
        </div>
    )
}

export default Sidebar