import React from 'react'
import "./home.css"
import PersonIcon from '@mui/icons-material/Person';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
function Home({homeOnlineusers}) {
  return (
    <>
   <Topbar/>
   <div className='homeContainer'>

   
   <Sidebar/>
   <Feed/>
   <Rightbar homeOnlineusers={homeOnlineusers}/>
   </div>
</>
  )
}

export default Home