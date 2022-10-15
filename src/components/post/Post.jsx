import { MoreVert } from '@mui/icons-material'
import React, { useState } from 'react'
import "./post.css"
import {Users} from "../../dummyData"
function Post({post}) {

  const [like,setLike]=useState(post.like);
  const [isLike,setIsLike]=useState(false)

  const handleLike=()=>{

    setLike(isLike?like-1:like+1);
    setIsLike(!isLike);
  }

  return (
    <div className='post'>
<div className="postWrapper">
      <div className="postTop">
<div className="postTopLeft">
  <img className='postProfileImg' src={Users.filter(u=>u.id===post.id)[0].profilePicture}/>
  <span className="postUserName">{Users.filter(u=>u.id===post.id)[0].username}</span>
  <span className="postDate">{post.date}</span>
</div>
<div className="postTopRight">
  <MoreVert/>
</div>
      </div>
      <div className="postCenter">
<span className="postText">{post?.desc}</span>
<img src={post.photo} alt="" className="postImg" />
      </div>
      <div className="postBottom">

        <div className="postBottomLeft">
<img className='likeIcon' src='assets/like.png' onClick={handleLike}/>
<img className='likeIcon' src='assets/heart.png' onClick={handleLike}/>
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