import React from 'react'
import './globalchat.css'
import {useRef,useEffect,useState,useContext} from 'react'
import {io} from 'socket.io-client';
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'
import Gmessage from '../../components/globalChat/Gmessage'
function Globalchat() {
    const globalSocket=useRef();
    const charInput=useRef();
    const [messagess,setMesseges]=useState([]);
    
    const [arrivalMessage,setArrivalMessage]=useState([]);
    const {user}=useContext(AuthContext);

    useEffect( ()=>{
        globalSocket.current=io("ws://localhost:8000");
const getSavesMesssages=async()=>{

const res= await axios.get(process.env.REACT_APP_API_URL+"/globalm/");

setMesseges(res.data);

}

getSavesMesssages();



 
    },[])

    

 useEffect(()=>{
  globalSocket.current.on("get:message",(data)=>{
  
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


const handleClick=async(text)=>{

   await axios.post(process.env.REACT_APP_API_URL+"/globalm/",{
    userid:user._id,
                username:user.username,
                userImg:user.profilePicture,
                text:text
   })

   await globalSocket.current.emit("send:message",{
        senderId:user._id,
        senderUsername:user.username,
        senderImg:user.profilePicture,

       
        text:text

    })

    charInput.current.value="";
   

}

  return (
    <div className="globalContainer">

        <div className="global">
        <div className="globalinputcenter">

       {   messagess.map((m)=>(
 
<Gmessage message={m}/>
       ))
       }
       <div className="globalinputdiv">
      <div className="inputsend">

     
          <input className="inputglobal" ref={charInput} placeholder="Write something!"></input>
       <button className="globalsend" onClick={()=>handleClick(charInput.current.value)}>Send</button>
       </div>
         </div>
       </div>
       
       
               </div>
    </div>
  )
}

export default Globalchat