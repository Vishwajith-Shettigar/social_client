import React from 'react'
import "./home.css"
import PersonIcon from '@mui/icons-material/Person';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import Globalchat from '../../components/globalChat/Globalchat';
function Home({homeOnlineusers,isGlobal,setIsglobal,}) {
  return (
    <>
   <Topbar/>
   <div className='homeContainer'>

   
   <Sidebar isGlobal={isGlobal} setIsglobal={setIsglobal}/>

  { 
  isGlobal?<Globalchat/>:
  <Feed/>
  
  }
   <Rightbar homeOnlineusers={homeOnlineusers} />
   </div>
</>
  )
}

export default Home