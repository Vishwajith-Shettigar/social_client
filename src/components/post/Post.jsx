import { DeleteForeverSharp, MoreVert, ReplySharp, ShapeLine, Share, ShareOutlined } from '@mui/icons-material'
import React, { useState,useEffect, useContext } from 'react'
import "./post.css"
import axios  from "axios"
import {format} from 'timeago.js'
import {Users} from "../../dummyData"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Comment from '../comment/Comment'
function Post({post,owner}) {
const PF=process.env.REACT_APP_PUBLIC_FOLDER;
const [user,setUser]=useState({});
const {user:currentUser}=useContext(AuthContext);
const [showMoreoptions,setShowMoreOptions]=useState(false);
const [showComment,setShowComment]=useState(false);




const deletePost=async(postId,userId)=>{

   const res=await axios.post("/post/"+postId,{userid:userId});
   window.location.reload(true);

}

const showMore=()=>{

  setShowMoreOptions(!showMoreoptions);
  console.log(showMoreoptions)
}

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



  <Link to={`profile/${post.anonymous?"anonymous": user.username}`}>



  <img className='postProfileImg' src={!post.anonymous? user.profilePicture? PF+"/person/"+user.profilePicture :PF+"/person/noAvatar.png": PF+"/person/noAvatar.png"}/>
 </Link>

  <span className="postUserName">{!post.anonymous? user.username:"Anonymous"}</span>
  <span className="postDate">{format(post.createdAt)}</span> 
</div>
<div className="postTopRight">
  <MoreVert className="threedot" onClick={showMore}/>
  {
    showMoreoptions?  owner==false ? (

      <div className="sharepostOptions">
       
        <ShareOutlined className="sharePostOptionsicons"/>
      </div>
      
    )
    :(
    
    
    <div className="sharepostOptions">
    <ShareOutlined className="sharePostOptionsicons"/>
    <DeleteForeverSharp className="sharePostOptionsicons" onClick={()=>deletePost(post._id,currentUser._id)}/>
    </div>
    
    ):
    
    <></>
  }
</div>
      </div>
      <div className="postCenter" >
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
          <span className="postCommentText" onClick={()=>{setShowComment(!showComment)}}>{post.comments.length} comments</span>
         

        </div>
       
      </div>
   { showComment? <Comment comment={post.comments} postid={post._id}  postUserid={post.userid}/>:<></>}
    </div>
    </div>
  )
}

export default Post