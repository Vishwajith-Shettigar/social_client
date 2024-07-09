import { Bookmark, Chat, Event, Group, HelpOutline, PlayArrow, PlayCircleFilledOutlined, RssFeed, Schedule, School, VideoCallRounded, VideoSettings, WorkOutline } from '@mui/icons-material'
import React from 'react'
import Closefriend from '../closefriend/Closefriend'
import "./sidebar.css"
import { useNavigate } from 'react-router-dom'
import PublicIcon from '@mui/icons-material/Public';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import {useState,useEffect,useContext} from 'react'
import Online from '../online/Online'
import axios from 'axios'
import {globalinfo} from "../../App";

function Sidebar({isGlobal,setIsglobal,isRandom,setIsRandom,homeOnlineusers}) {
const {user}=useContext(AuthContext)
const {showSidebar} =useContext(globalinfo)
   
const navigate=useNavigate();
const [recomUsers,setRecomusers]=useState([]);

useEffect(()=>{
    const getRecom=async()=>{


        const res=await axios.get(process.env.REACT_APP_API_URL+"/user/getuserrecom/"+user._id);
       
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
                    <li onClick={()=>{isRandom===true?setIsRandom(false)&&setIsglobal(true):setIsglobal(!isGlobal) }} className={ isGlobal ?"sidebarListItem focusTab":"sidebarListItem"}>

                        <PublicIcon className='sidebarIcon' />
                        <span className={ isGlobal ? 'sidebarListItemText ':"sidebarListItemText"}>Global chat</span>
                  
                    </li>
                    <li onClick={()=>{isGlobal===true?setIsglobal(false)&&setIsRandom(true):setIsRandom(!isRandom) }} className={ isRandom ?"sidebarListItem focusTab":"sidebarListItem"}>

                        <Group className='sidebarIcon' />
                        <span className='sidebarListItemText'>Random Chat</span>
                    </li>
                    <li className="sidebarListItem">

                        <Bookmark className='sidebarIcon' />
                        <span className='sidebarListItemText'>Bookmarks</span>
                    </li>
                   
                  
                    

                </ul>
               { 
               
               showSidebar&&<>
               <button className="sidebarButton">Online friends</button>
             {  homeOnlineusers?.map((u)=>(
     <Online key={u} userOnline={u}/>
   ))}
               </>
               



}

                <hr className='sidebarHr'/>
                <ur className="sidebarfriendList">
                    <span className="Recommendationtext">Recommendation</span>
                   

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