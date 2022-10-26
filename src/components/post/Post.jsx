import { MoreVert } from '@mui/icons-material'
import React, { useState,useEffect, useContext } from 'react'
import "./post.css"
import axios  from "axios"
import {format} from 'timeago.js'
import {Users} from "../../dummyData"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
function Post({post}) {
const PF=process.env.REACT_APP_PUBLIC_FOLDER;
const [user,setUser]=useState({});
const {user:currentUser}=useContext(AuthContext);

useEffect(()=>{

  setIsLike(post.likes.includes(currentUser._id))

},[currentUser._id,post.likes])


useEffect( ()=>{
  
const fetchUser=async()=>{
  console.log(post.userid)

const res=  await axios.get(`/user?userid=${post.userid}`)

  setUser(res.data);
 
 
}
  
fetchUser();

},[post.userid])


  const [like,setLike]=useState(post.likes.length);
  const [isLike,setIsLike]=useState(false)

  const handleLike=()=>{
try{
 axios.put("/post/"+post._id+"/like",{userid:currentUser._id})

}catch(e)
{

}
    setLike(isLike?like-1:like+1);
    setIsLike(!isLike);
  }
if(user)
  return (
    <div className='post'>
<div className="postWrapper">
      <div className="postTop">
<div className="postTopLeft">
<Link to={`profile/${user.username}`}>
  <img className='postProfileImg' src={user.profilePicture? PF+"/person/"+user.profilePicture :PF+"/person/noAvatar.png"}/>
 </Link>

  <span className="postUserName">{user.username}</span>
  <span className="postDate">{format(post.createdAt)}</span> 
</div>
<div className="postTopRight">
  <MoreVert/>
</div>
      </div>
      <div className="postCenter">
<span className="postText">{post?.desc}</span>
<img src={PF+"/post/"+post.img} alt="" className="postImg" />
      </div>
      <div className="postBottom">

        <div className="postBottomLeft">
<img className='likeIcon' src="/assets/like.png" onClick={handleLike}/>
<img className='likeIcon' src='/assets/heart.png' onClick={handleLike}/>
<span className="postLikeCounter">{like}</span>
        </div>
        <div className="postBottomRight">
          <span className="postCommentText">{post.comment} comments</span>

        </div>
      </div>
    </div>
    </div>
  )
}

export default Post