import React, { useContext, useEffect, useState } from 'react'
import "./rightbar.css"
import {Users} from "../../dummyData"
import Online from '../online/Online'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove } from '@mui/icons-material'
function Rightbar({user,homeOnlineusers}) {

const PF=process.env.REACT_APP_PUBLIC_FOLDER
  
const{user:currentUser,dispatch}=useContext(AuthContext);






 const  HomeRightbar=()=>{
console.log(homeOnlineusers)

    return(
      <>
      <div className="birthdayContainer">
        <img src="/assets/gift.png" className='birthdayImg'/>
        <span className='birthdayTest'><b>Pola</b> and <b>3 others</b>  have birthday today </span>
  </div> 
  <img src="/assets/ad.png" alt="" className="rightbarAd" />
  <h4 className="rightbarTitle">Online friends</h4>

  <ul className="rightbarFriendList">
   
 {  homeOnlineusers.map((u)=>(
     <Online key={u} userOnline={u}/>
   ))
  }
  
   
  </ul>
      </>
    )
  }

  const ProfileRightbar=()=>{
    const [followed,setFollowed]=useState(currentUser?.following?.includes(user?._id));
    const handleFollow=async()=>{
      try{
      
       if(!followed){
        dispatch({type:"FOLLOW",payload:user._id})
        await axios.put("/user/"+user._id+"/follow",{userid:currentUser._id})
       }else{
        dispatch({type:"UNFOLLOW",payload:user._id})
        await axios.put("/user/"+user._id+"/unfollow",{userid:currentUser._id})
      
       }
      }catch(e)
      {
        
      }
        setFollowed(!followed)
      }


useEffect(()=>{
  setFollowed(currentUser?.following?.includes(user?._id))
  // currentUser.following.includes(user?.id)

},[currentUser,user.id])


const [friends,setFriends]=useState([]);

  useEffect(()=>{

   const getFriends= async()=>{

     try{
 const friendList=await axios.get("/user/friends/"+user._id)
 setFriends(friendList.data)
     }catch(e)
     {

     }
   }

   getFriends()

  },[user._id])

console.log(friends)

    return(
      <>
      {user?.username!=currentUser?.username && (
 <button className='rightbarFollowButton' onClick={handleFollow}>
  
  {followed? "Unfollow":"Follow"}
  {followed?<Remove/>:<Add/>}


 </button>

      )}
      <h4 className='rightbarTitle'>User information </h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City</span>
          <span className="rightbarInfoValue"> {user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From</span>
          <span className="rightbarInfoValue"> {user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship</span>
          <span className="rightbarInfoValue"> {user.relationship==="1"?"single" :user.relationship==="2"? "married" :"---"}</span>
        </div>
       
      </div>

      <h4 className='rightbarTitle'>User friends </h4>
      <div className="rightbarFollowings">

       {
       friends.map((friend)=>(
          <Link to={`/profile/${friend.username}` } style={{textDecoration:"none"}}>

          <div className="rightbarFollowing" style={{alignItems:"center",justifyContent:"center"}}>
          <img src={friend.profilePicture? PF+"/person/"+friend.profilePicture: PF+"/person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">{friend.username}</span>
        </div>
        </Link>
       ))
     
        
        }

       
      </div>
      </>
    )
  }
  return (
    <div className='rightbar'>

      <div className="rightbarWrapper">
{user?<ProfileRightbar/>:<HomeRightbar/>}
     </div>
    </div>
  )
}

export default Rightbar
