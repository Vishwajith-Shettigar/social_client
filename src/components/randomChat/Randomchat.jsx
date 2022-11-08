import React from 'react'
import './randomchat.css'
import {useRef,useEffect,useState,useContext} from 'react'
import {io} from 'socket.io-client';
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'
import Gmessage from '../../components/globalChat/Gmessage'
function RandomChat({randomSocket}) {
  
    const charInput=useRef();
    const [connected,setConnected] =useState(false);
   
    const [messagess,setMesseges]=useState([]);
    const [partnerId,setPartnerId]=useState("null");
    
    const [arrivalMessage,setArrivalMessage]=useState([]);
    const {user}=useContext(AuthContext);

 

  
    useEffect( ()=>{
    if(connected===false)
      
{     
  console.log("conected")
  randomSocket.current=io("ws://localhost:7000");
      randomSocket.current.emit("adduser",user._id)
      setConnected(true)
}
  
  }
  
  
  
  
  
  ,[randomSocket])
    
 

 useEffect(()=>{
  randomSocket?.current.on("gettt:message",(data)=>{
  
if(data.senderId===user._id)
setArrivalMessage({userid:data.senderId,username:data.senderUsername,userImg:data.senderImg,text:data.text,owner:true})

 else{
  setArrivalMessage({userid:data.senderId,username:data.senderUsername,userImg:data.senderImg,text:data.text,owner:false})
 }
   
        
})

},[])

useEffect(()=>{
 
setMesseges((old)=>[...old,arrivalMessage])

},[arrivalMessage])

const hanldeSkip=async()=>{
console.log("under skip")
  await randomSocket.current.emit("getuserpartner",{userid:user._id,partnerId: partnerId})

}

useEffect(()=>{
  randomSocket.current.on("getusers",(data)=>{
    console.log("yoooooooooooo")
    console.log(data)
  })
},[])

const handleClick=async(text)=>{

  

   await randomSocket.current.emit("senddd:message",{
        senderId:user._id,
        senderUsername:user.username,
        senderImg:user.profilePicture,

       
        text:text

    })

    charInput.current.value="";
   

}

  return (
    <div className="rglobalContainer">

        <div className="rglobal">
        <div className="rglobalinputcenter">

       {   messagess.map((m)=>(
 
<Gmessage message={m}/>
       ))
       }
       <div className="rglobalinputdiv">
      <div className="rinputsend">

     
          <input className="rinputglobal" ref={charInput}></input>
       <button className="rglobalsend" onClick={()=>handleClick(charInput.current.value)}>Send</button>
       <button className="rRandomSkip" onClick={()=>hanldeSkip()}>Skip</button>
       </div>
         </div>
       </div>
       
       
               </div>
    </div>
  )
}

export default RandomChat