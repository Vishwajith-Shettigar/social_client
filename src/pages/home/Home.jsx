import React from 'react'
import "./home.css"
import PersonIcon from '@mui/icons-material/Person';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import Globalchat from '../../components/globalChat/Globalchat';
import Randomchat from '../../components/randomChat/Randomchat'
import {useContext} from 'react'
import {globalinfo} from '../../App'
function Home({ randomSocket,homeOnlineusers,isGlobal,setIsglobal,isRandom,setIsRandom,removeCookie}) {

  
  const {mobile,showSidebar}=useContext(globalinfo)
  return (
    <>
   <Topbar removeCookie={removeCookie} mobile={mobile}/>
   <div className='homeContainer'>

   
   {
     mobile? showSidebar&&
    <Sidebar isGlobal={isGlobal} setIsglobal={setIsglobal} isRandom={isRandom} setIsRandom={setIsRandom} homeOnlineusers={homeOnlineusers} />
    : <Sidebar isGlobal={isGlobal} setIsglobal={setIsglobal} isRandom={isRandom} setIsRandom={setIsRandom}/>
   }

  { 
    isGlobal || isRandom ? isGlobal? <Globalchat/> :<Randomchat randomSocket={randomSocket}/>:<Feed/> 
   
  }

  { !mobile&& <Rightbar homeOnlineusers={homeOnlineusers} />}
   </div>
</>
  )
}

export default Home