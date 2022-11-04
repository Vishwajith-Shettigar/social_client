import React from 'react'
import "./profile.css"
import { useState } from 'react';
import { useEffect } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import Topbar  from "../../components/topbar/Topbar"
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import axios from 'axios'
import {useRef} from 'react'
import { useParams } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext'
import {useContext} from 'react'
import {useNavigate} from'react-router-dom';
function Profile() {
const [isEdit,setIsEdit]=useState(false)
const navigate=useNavigate();
const {user:currentUser}=useContext(AuthContext)
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
const params=useParams();
  const [user,setUser]=useState({});
  const eusername=useRef();
  const eemail=useRef();
  const enpassword=useRef();
  const eopassword=useRef();
  const edisc=useRef();
  const ecity=useRef();
  const efrom=useRef();
  const erelationship=useRef();
  const [relations,setrelation]=useState(null)
  const [eprofilePic,setEprofilePic]=useState(null);
  const [ecoverpicture,setEcoverPicture]=useState(null);
  const [pfile,setPFile]=useState(null);
  const [cfile,setCFile]=useState(null);





  useEffect( ()=>{
    // line changes

    if(params.username=="anonymous"){

    }
    else{
  const fetchUser=async()=>{
   
  const res=  await axios.get(`/user?username=${params.username}`)
  
    setUser(res.data);
   
   
  }
    
  fetchUser();
}
  },[params.username])

  const handlerelationship=(e)=>{

    console.log("hiiiii")
    console.log(e.target.value);
    setrelation(e.target.value)
    console.log( relations)

  }

  const handleProfileUpdate=async (e)=>{
    e.preventDefault()
console.log("hello")

console.log(eusername.current.value)
console.log(edisc.current.value)
console.log(eemail.current.value)
console.log(eopassword.current.value)
console.log( enpassword.current.value)
console.log( ecity.current.value)

console.log("-----------")
console.log(efrom.current.value)
   console.log(relations)
   console.log(pfile)
   console.log("-----------")
console.log("pfile")
let re="";

if(relations=="single")
re="1";
else if(relations=="married")
re="2";
else if(relations=="dont want to disclose")
re="3"



const updatedUser={
username:eusername.current.value,
email:eemail.current.value,
desc:edisc.current.value,
oldpassword:eopassword.current.value,

password:enpassword.current.value,
city:ecity.current.value,
from:efrom.current.value,
relationship:re,


}

if(pfile)
{
  
  const data= new FormData();
  const fileName=String(Date.now()+pfile.name);
  
console.log(data.file)
  data.append("name",fileName);
  data.append("notapost",true)

  data.append("file",pfile);
  updatedUser.profilePicture =fileName



try{
  await axios.post("/upload",data);

}catch(e)
{

}


}

if(cfile)
{
  const data= new FormData();
  const fileName=String(Date.now()+pfile.name);
  
console.log(data.file)
  data.append("name",fileName);
  data.append("notapost",true)

  data.append("file",cfile);
  updatedUser.coverPicture =fileName



try{
  await axios.post("/upload",data);

}catch(e)
{

}
}

try{

const res=await axios.post("/user/"+user._id,updatedUser)
console.log(res.data)

navigate("/")
window.location.reload(true)

}catch(e){
 window.alert("something went wrong")
}

  }

  if(user)



 if(isEdit){
  return (
    <>
     <Topbar/>
    
     <div className='profile'>
       <Sidebar/>
       <div className="profileRight">
         <div className="Editcontainer">
          <div className="ediv">
            <span className="einput">username</span>
          <input type="text" className="einput" placeholder={user.username} ref={eusername}></input>
          </div>
          
<div className="ediv">
            <span className="einput">description</span>
          <input type="text" className="einput" placeholder={user.desc} ref={edisc}></input>
          </div>
          <div className="ediv">
            <span className="einput">Email</span>
          <input type="email" className="einput"placeholder={user.email} ref={eemail}></input>
          </div>

          <div className="ediv">
            <span className="einput">old Password</span>
          <input type="password" className="einput" placeholder={"Enter old password"}ref={eopassword}></input>
          </div>

          <div className="ediv">
            <span className="einput">new Pasword</span>
          <input type="password" className="einput" placeholder={"Enter new password"} ref={enpassword}></input>
          </div>

          <div className="ediv">
            <span className="einput">Profile picture</span>
          <input type="file" className="einput" accept=".png,.jpeg,.jpg,.mp4" onChange={(e) => { setPFile(e.target.files[0]) }}></input>
          </div>
          <div className="ediv">
            <span className="einput">Cover Picture</span>
          <input type="file" className="einput" accept=".png,.jpeg,.jpg,.mp4" onChange={(e) => { setCFile(e.target.files[0]) }}></input>
          </div>
          <div className="ediv">
            <span className="einput">city</span>
          <input type="text" className="einput" placeholder={user.city} ref={ecity}></input>
          </div>
          <div className="ediv">
            <span className="einput">from</span>
          <input type="text" className="einput" placeholder={user.from} ref={efrom}></input>
          </div>
          <div className="ediv einputbutton" onChange={handlerelationship}>
            <span className="einput " >Relationship</span>
          <input type="radio" className="einput einputbutton" name="relation" value="single"/>single
          <input type="radio"  className="einput einputbutton" name="relation" value="married"/>married
          <input type="radio"  className="einput einputbutton" name="relation" value="dont want to disclose" />Dont want to disclose
          </div>
          <div className="ediv einputbutton">
           
          <button type="button" className="einputbutton esenonc" onClick={handleProfileUpdate} >update</button>
          </div>
         </div>

       </div>
    
     </div>
     
     </>
  )

 }else 
  return (
    <>
    <Topbar/>
    <div className='profile'>
 
    
    <Sidebar/>

    <div className="profileRight">

      <div className="profileRightTop">
<div className="profileCover">
  <img className='profileCoverImg' src={params.username=="anonymous"?PF+"/person/noCover.png": user.coverPicture? PF+"/person/"+user.coverPicture: PF+"/person/noCover.png"}/>
        
        <img className='profileUserImg' src={params.username=="anonymous"?PF+"/person/noAvatar.png":  user.profilePicture? PF+"/person/"+user.profilePicture : PF+"/person/noAvatar.png"}/>
      
</div> 
 {
          currentUser?._id===user?._id && <div className="editProfile" ><CreateIcon className="editButton" onClick={()=>{console.log("lol"); setIsEdit(!isEdit)}}/></div> 
        }
<div className="profileInfo">
  <h4 className='profileInfoName'>{params.username=="anonymous"?"Anonymous":user.username}</h4>
  <span className='profileInfoDesc'>{params.username=="anonymous"?"Hey am anonymous i am little shy about to share my story thats why, hope you understand <3":user.desc}</span>
</div>
        
      </div>
     {/* line chnages */}
     {
      params.username=="anonymous"?<></>:
     <div className="profileRightBottom">
        <Feed username={params.username}/>
    <Rightbar user={user}/>
      </div>}
    </div>
    
    </div>
 </>
  )
     }


export default Profile