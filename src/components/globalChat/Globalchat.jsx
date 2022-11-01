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
    const [lol,setLol]=useState(false);
    useEffect( ()=>{
        globalSocket.current=io("ws://localhost:8000");
const getSavesMesssages=async()=>{

const res= await axios.get("/globalm/");
console.log("------------------------")
console.log(res.data)
setMesseges(res.data);

}

getSavesMesssages();



 
    },[])

    

 useEffect(()=>{
  globalSocket.current.on("get:message",(data)=>{
  console.log(" get message--------")
if(data.senderId===user._id)
setArrivalMessage({userid:data.senderId,username:data.senderUsername,userImg:data.senderImg,text:data.text,owner:true})

 else{
  setArrivalMessage({userid:data.senderId,username:data.senderUsername,userImg:data.senderImg,text:data.text,owner:false})
 }
   
        
})

},[])

useEffect(()=>{
  console.log("arrival")
setMesseges((old)=>[...old,arrivalMessage])

},[arrivalMessage])


const handleClick=async(text)=>{

   await axios.post("/globalm/",{
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


   

}
console.log(messagess)
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

     
          <input className="inputglobal" ref={charInput}></input>
       <button className="globalsend" onClick={()=>handleClick(charInput.current.value)}>Send</button>
       </div>
         </div>
       </div>
       
       
               </div>
    </div>
  )
}

export default Globalchat