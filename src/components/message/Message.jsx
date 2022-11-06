import React from 'react'
import "./message.css"
import {useEffect,useState} from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
function Message({message, own}) {
const [img,setImg]=useState();
const PF=process.env.REACT_APP_PUBLIC_FOLDER;
useEffect(() =>{
  console.log("hoo")
  const getuserImg=async() =>{

    const res=await axios.get("/user?userid="+message.sender)
   
 
    setImg(res.data.profilePicture)
  }
  getuserImg();

},[message.sender]

)
  
  return (
    <div className={own?'message own':"message"}>

        <div className="messageTop">
<img className="messageImg" src={img? PF+"/person/"+img: PF+"/person/noAvatar.png"} alt="" />
<p className='messageText'>{message.text}</p>
        </div>
        <div className="messageBottom">
           {format(message.createdAt)}
        </div>
    </div>
  )
}

export default Message