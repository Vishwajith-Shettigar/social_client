import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useContext,useEffect,useRef,useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Comment from "./components/comment/Comment";
import { useCookies } from 'react-cookie';
import RandomChat from "./components/randomChat/Randomchat";
import RandomChatparentPage from "./pages/RandomChatParaent/RandomChatparentPage";
import axios from 'axios';
import {io} from "socket.io-client"


function App() {
  const randomSocket=useRef();
  const [isGlobal,setIsglobal]=useState(false);
  const [isRandom,setIsRandom]=useState(false);

  const [homeOnlineusers,setHomeOnlineUsers]=useState([]);
  const socket=useRef();

  const {user,dispatch}=useContext(AuthContext)
  const [jwtToken, setJwtToken, removeCookie] = useCookies(["userId"]);


useEffect(()=>{

 const loll=async()=>{

      await randomSocket?.current.emit("make:diss",(user?._id))
    }
    if(!isRandom)
   loll();

},[isRandom])
   
  


  useEffect(()=>{
    socket.current=io("ws://localhost:8900");
    
    
    },[])

    useEffect(()=>{
      if(user)
     {
      
      // console.log("userrr")
      socket.current.emit("adduser",user._id);
  socket.current.on("getUsers",users=>{
    setHomeOnlineUsers(

          user.following.filter((f)=>users.some((u)=>u.userid===f))
      )
  })

    }
      
    },[user,socket])

  

useEffect(()=>{
const getUser=async()=>{
    try{
  const res=await axios.get("/user?userid="+jwtToken.userId);
  dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    }
    catch(e)
    {

    }

  }

  getUser();

},[jwtToken.userId])
  


  return (
    <Router>
<Routes>

  <Route exact path="/" element={user?<Home randomSocket={randomSocket} homeOnlineusers={homeOnlineusers} isGlobal={isGlobal} setIsglobal={setIsglobal} isRandom={isRandom}  setIsRandom={setIsRandom}/>:<Register/>}></Route>
  <Route path="/login" element={user? <Navigate to="/"/> :<Login setJwtToken={setJwtToken}/>}></Route>
  <Route path="/register" element={user?<Navigate to="/"/> : <Register/>}></Route>
  <Route path="/messenger" element={!user?<Navigate to="/"/> : <Messenger socket={socket}/>}></Route>
<Route path="/comment" element={ <Comment/>}></Route>
  <Route path="/profile/:username" element={<Profile/>}></Route>
  <Route path="/randomchat" element={user?<RandomChatparentPage randomSocket={randomSocket} homeOnlineusers={homeOnlineusers} isGlobal={isGlobal} setIsglobal={setIsglobal} isRandom={isRandom}  setIsRandom={setIsRandom}/>:<Register/>}></Route>
 
</Routes>
    </Router>
    

  );
}

export default App;
