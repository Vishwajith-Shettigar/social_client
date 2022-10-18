import React, { useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import "./feed.css"
import  axios  from 'axios'
// import {Posts} from "../../dummyData"
function Feed({username}) {
 console.log(username)
  const [posts,setPosts]=useState();

  useEffect( ()=>{
    
 const fetchPosts=async()=>{
  const res=  username
   ? await axios.get("/post/profile/"+username)
   : await axios.get("/post/timeline/63482a69f32e44db8c9068ad")

    setPosts(res.data);
   
   
 }
    
fetchPosts();

  },[])

if(posts)
  return (
    <div className='feedbar'>

      <div className="feedWrapper">
        <Share/>
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