import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./chatonline.css"
function Chatonline({onlineUser,currentId,setCurrentChat}) {
// console.log(onlineUser)

const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends,setFriends]=useState([]);

    const [onlineFriends,setOnlineFriends]=useState([])
    const [offlineFriends,setOfflineFriends]=useState([])


    useEffect(()=>{

        const getFriends=async()=>{
 const res=await axios.get("/user/friends/"+currentId)

 setFriends(res.data);

        }

        getFriends();
    },[currentId])


useEffect(()=>{
   
 onlineUser&& setOnlineFriends(friends.filter((f)=> 
   
onlineUser.includes(f._id)

   
))

onlineUser&& setOfflineFriends(friends.filter((f)=>
    
   !( onlineUser.includes(f._id))
    ))

},[friends,onlineUser])

 onlineFriends && console.log(onlineFriends)
const handleClick=async(user)=>{

    try{

        const res=await axios.get("/conversation/find/"+currentId+"/"+user._id)
      
        setCurrentChat(res.data);
    }catch(e)
    {
console.log(e)

    }

}


 if(onlineFriends)
  return (
    <>
    <div className='chatonline'>


{
    onlineFriends.map((o)=>(
          <div className="chatonlineFriend" onClick={()=>handleClick(o)} >
    <div className="chatonlineImgContainer">
        <img src={o.profilePicture? PF+"/person/"+o.profilePicture :PF+"/person/noAvatar.png"} alt="" className="chatonlineImg" />
        <div className="chatonlineBadge">

        </div>
    </div>
    <span className="chatonlineName">
       {o?.username}
    </span>
</div>
    ))
  
}

    </div>

<div className='chatonline'>


{
    offlineFriends.map((o)=>(
          <div className="chatonlineFriend" onClick={()=>handleClick(o)} >
    <div className="chatonlineImgContainer">
        <img src={o.profilePicture? PF+"/person/"+o.profilePicture :PF+"/person/noAvatar.png"} alt="" className="chatonlineImg" />
        <div className="chatonlineBadgeoffline">

        </div>
    </div>
    <span className="chatonlineName">
       {o?.username}
    </span>
</div>
    ))
  
}

    </div>
    </>
  )
}

export default Chatonline