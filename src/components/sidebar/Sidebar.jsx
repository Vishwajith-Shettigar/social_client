import { Bookmark, Chat, Event, Group, HelpOutline, PlayArrow, PlayCircleFilledOutlined, RssFeed, Schedule, School, VideoCallRounded, VideoSettings, WorkOutline } from '@mui/icons-material'
import React from 'react'
import Closefriend from '../closefriend/Closefriend'
import "./sidebar.css"
import { useNavigate } from 'react-router-dom'
import PublicIcon from '@mui/icons-material/Public';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
function Sidebar({isGlobal,setIsglobal,isRandom,setIsRandom}) {
const {user}=useContext(AuthContext)
   
const navigate=useNavigate();
const [recomUsers,setRecomusers]=useState([]);

useEffect(()=>{
    const getRecom=async()=>{


        const res=await axios.get("/user/getuserrecom/"+user._id);
       
        setRecomusers(res.data)

    }
getRecom();
},[user])

    return (
        <div className='sidebar'>

            <div className="sidebarWrapper">
                <ul className="sidebarList">

                    <li className="sidebarListItem">

                        <RssFeed className='sidebarIcon' />
                        <span className='sidebarListItemText'>Feed</span>
                    </li>
                    <li className="sidebarListItem" onClick={()=>{navigate("/messenger")}}>

                        <Chat className='sidebarIcon' />
                        <span className='sidebarListItemText'>Chats</span>
                    </li>
                    <li onClick={()=>{isRandom===true?setIsRandom(false)&&setIsglobal(true):setIsglobal(!isGlobal) }} className="sidebarListItem">

                        <PublicIcon className='sidebarIcon' />
                        <span className='sidebarListItemText'>Global chat</span>
                  
                    </li>
                    <li onClick={()=>{isGlobal===true?setIsglobal(false)&&setIsRandom(true):setIsRandom(!isRandom) }} className="sidebarListItem">

                        <Group className='sidebarIcon' />
                        <span className='sidebarListItemText'>Random Chat</span>
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

                    recomUsers.map((u)=>(
                         <Closefriend key={u._id} user={u}/>
                    ))
                  }
                    
                </ur>
            </div>
        </div>
    )
}

export default Sidebar