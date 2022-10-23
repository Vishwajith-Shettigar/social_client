import React, { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import "./feed.css"
import  axios  from 'axios'
import { AuthContext } from '../../context/AuthContext'
// import {Posts} from "../../dummyData"
function Feed({username}) {

  const [posts,setPosts]=useState();
const {user}=useContext(AuthContext);

  useEffect( ()=>{
    
 const fetchPosts=async()=>{
 
  const res=  username
   ? await axios.get("/post/profile/"+username)
   : await axios.get(`/post/timeline/${user._id.$oid}`)

    setPosts(res.data.sort((p1,p2)=>{
      return new Date(p2.createdAt)- new Date(p1.createdAt);
    }));
   
   
 }
    
fetchPosts();

  },[username,user._id.$oid])

if(posts)
  return (
    <div className='feedbar'>

      <div className="feedWrapper">
      { (!username || username===user.username)&&<Share/>}
        <>
        {posts.map((p)=>(
<Post key={p._id} post={p}/>  

        ))}
        </>
        
      </div>
    </div>
  )
}

export default Feed