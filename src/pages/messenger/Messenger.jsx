import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Chatonline from '../../components/chatonline/Chatonline'
import Conversations from '../../components/conversations/Conversations'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import {io} from "socket.io-client"
import "./messenger.css"
function Messenger({socket}) {
    const [conversations,setConversations]=useState([]);
  const [currentChat,setCurrentChat]=useState(null);
  const [messeges,setMesseges]=useState(null);
  const [newMessage,setNewMessage]=useState();
const [onlineUsers,setOnlineUsers]=useState()
const [arrivalMessage,setArrivalMessage]=useState(null)

// const socket=useRef();
const scrollRef=useRef();
    const {user}=useContext(AuthContext);

useEffect(()=>{

socket.current.on("getMessage",(data)=>{
    console.log("meeaewafe")
    console.log(data)
    setArrivalMessage({
        sender:data.senderId,
        text:data.text,
        createdAt:Date.now()
    })
        
})

},[])

useEffect(()=>{
arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)&&
setMesseges(prev=> [...prev,arrivalMessage])

},[arrivalMessage,currentChat])

useEffect(()=>{
    socket.current.emit("adduser",user._id)
    socket.current.on("getUsers",users=>{
        setOnlineUsers(

            user.following.filter((f)=>users.some((u)=>u.userid===f))
        )
    })
},[socket])




    useEffect(()=>{
        const getConversation=async()=>{
try{
    
    const res=await axios.get("/conversation/"+user._id)
   
    setConversations(res.data);
}catch(e)
{

}

        }
        getConversation();
},[user._id])


useEffect(()=>{
const getMesseges=async()=>{
try{
    const res=await axios.get("/message/"+currentChat?._id)
    setMesseges(res.data);
}
catch(e)
{

}
}
getMesseges();

},[currentChat])

const handlesubmit=async(e)=>{
    e.preventDefault();
    const message={
        sender:user._id,
        text:newMessage,
        conversationId:currentChat._id
    }

const receiverId=currentChat.members.find(member=>member!=user._id)
console.log(receiverId,"hello id")
socket.current.emit("sendMessage",{
    senderId:user._id,
    receiverId:receiverId,
    text:newMessage
})

try{
    const res=await axios.post("/message",message);
    setMesseges([...messeges,res.data])
    setNewMessage("")

}catch(e)
{

}
}


useEffect(()=>{

scrollRef.current?.scrollIntoView({behaviour:"smooth"});
},[messeges])

    return (
        <>
            <Topbar />
            <div className='messenger'>

                <div className="chatMenu">

                    <div className="chatMenuWrappper">
                        <input className='charMenuInput' placeholder='search your friends'></input>
                       
                      {  
                      
                      conversations.map((c)=>(
                        <div  onClick={()=>setCurrentChat(c)}>
                         <Conversations conversation={c} currentUser={user}/>
                         </div>
                      ))
                     
                       }
                    </div>
                </div>
                <div className="chatBox">

                    <div className="chatBoxWrappper">
                        {
                            currentChat?
<>
                            <div className="chatBoxTop">
                      {
                        messeges.map((m)=>(
                            <div ref={scrollRef}>
                            <Message message={m} own={m.sender===user._id} />
</div>


                        ))
                        

                      }
                    </div>
                   
                    
                    <div className="chatBoxBottom">
                        <textarea placeholder='say hello' onChange={(e)=>{setNewMessage(e.target.value)}} className='chatMessageInput' value={newMessage}></textarea>
                        <button onClick={handlesubmit} className='chatSubmitButton'>send</button>
                    
                    </div>
                      </>
                     :<span className='noConversationText'>Open a conversation</span>
                    }
                  
                    </div>
                </div>
                <div className="chatOnline">

                    <div className="chatOnlineWrappper">
<Chatonline onlineUser={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
                    </div>
                </div>

            </div>

        </>

    )
}

export default Messenger