import React from 'react'
import './randomchat.css'
import { useRef, useEffect, useState, useContext } from 'react'
import { io } from 'socket.io-client';
import { AuthContext } from '../../context/AuthContext'
import Gmessage from '../../components/globalChat/Gmessage'
function RandomChat({ randomSocket }) {

  const charInput = useRef();
  const [connected, setConnected] = useState(false);

  const [messagess, setMesseges] = useState([]);
 

  const [arrivalMessage, setArrivalMessage] = useState([]);
  const { user } = useContext(AuthContext);


useEffect(()=>{
const disUser=async()=>{
  if(connected==true){
await randomSocket.current.emit("disconn")
setConnected(false)
} 

}
disUser();

},[])


  useEffect(() => {

    const getConnect = async () => {

      if (connected === false) {


        console.log("conected")
        randomSocket.current = io("ws://localhost:7000");
      
        setConnected(true)
      }

    }

  
  
  getConnect();
  
  
  
}, [])



  useEffect(() => {
    randomSocket?.current.on("getMessage", (data) => {

      if (data.senderId === user._id)
        setArrivalMessage({ userid: data.senderId, username: data.senderUsername, userImg: data.senderImg, text: data.text, owner: true })

      else {
        setArrivalMessage({ userid: data.senderId, username: data.senderUsername, userImg: data.senderImg, text: data.text, owner: false })
      }


    })

    randomSocket?.current.on("disconn", (data) => {
console.log(data.who)
if(data.who===1)
{
  window.alert("You skipped user")
}else if(data.who===2){
  window.alert("you got skipped")
}
setMesseges([])
    })

  }, [])

  useEffect(() => {

    setMesseges((old) => [...old, arrivalMessage])

  }, [arrivalMessage])

  const hanldeSkip = async () => {
   
    await randomSocket.current.emit("disconn")
    await randomSocket.current.emit("new")

  }



  const handleClick = async (text) => {
console.log(text)


    await randomSocket.current.emit("chat", {
      senderId: user._id,
      senderUsername: user.username,
      senderImg: user.profilePicture,


      text: text

    })
    setArrivalMessage({ userid:user._id, username: user.username, userImg: user.profilePicture, text: text, owner: true })

    charInput.current.value = "";


  }

  return (
    <div className="rglobalContainer">

      <div className="rglobal">
        <div className="rglobalinputcenter">

          {messagess.map((m) => (

            <Gmessage message={m} />
          ))
          }
          <div className="rglobalinputdiv">
            <div className="rinputsend">


              <input className="rinputglobal" ref={charInput}></input>
              <button className="rglobalsend" onClick={() => handleClick(charInput.current.value)}>Send</button>
              <button className="rRandomSkip" onClick={() => hanldeSkip()}>Skip</button>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default RandomChat