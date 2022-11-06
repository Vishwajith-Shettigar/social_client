import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./conversation.css"
function Conversations({conversation,currentUser}) {
const PF=process.env.REACT_APP_PUBLIC_FOLDER
const [user,setuser]=useState(null)

useEffect(()=>{
const friendId= conversation.members.find(m=>m!==currentUser._id)
const getUser=async()=>{
  try{
  const res=await axios("/user/?userid="+friendId)
 setuser(res.data)
  }catch(e)
  {

  }
}
getUser()

},[])
if(user)

  return (
    <div className='conversation'>

<img className='conversationImg' src={user.profilePicture? PF+"/person/"+user.profilePicture : PF+"/person/noAvatar.png"}></img>
<span className='conversationName'>{user.username}</span>
    </div>
  )
}

export default Conversations