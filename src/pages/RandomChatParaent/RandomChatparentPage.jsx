import React from 'react'
import "../home/home.css"
import {useEffect} from 'react'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import Globalchat from '../../components/globalChat/Globalchat';
import Randomchat from '../../components/randomChat/Randomchat'
import { useNavigate } from 'react-router-dom';

function RandomChatparentPage({randomSocket,homeOnlineusers,isGlobal,setIsglobal,isRandom,setIsRandom}) {

    const navigate=useNavigate();
   if(isGlobal)
{
navigate("/")

}

  
  return (
    <>
   <Topbar/>
   <div className='homeContainer'>

   
   <Sidebar isGlobal={isGlobal} setIsglobal={setIsglobal} isRandom={isRandom} setIsRandom={setIsRandom}/>

   { 
 
 <Randomchat randomSocket={randomSocket}/>
  
  }
   <Rightbar homeOnlineusers={homeOnlineusers} />
   </div>
</>
  )
}

export default RandomChatparentPage