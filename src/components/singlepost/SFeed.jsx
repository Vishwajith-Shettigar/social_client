import React, { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import "../feed/feed.css"
import  axios  from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { useParams } from 'react-router-dom';
// import {Posts} from "../../dummyData"
function SFeed({username}) {
const queryparams=useParams();
  const [posts,setPosts]=useState();
const {user}=useContext(AuthContext);

  useEffect( ()=>{
    
 const fetchPosts=async()=>{
 console.log()
  const res=  await axios.get(process.env.REACT_APP_API_URL+`/post/${queryparams.postid}`)

    setPosts(res.data)
   
   
 }
    
fetchPosts();

  },[])

if(posts && user)
  return (
    <div className='feedbar'>

      <div className="feedWrapper">
      { (!username || username===user.username)&&<Share/>}
        <>
        {
     
          ( username && posts.anonymous? username!=user.username?true:false:false)?<></>:
<Post key={posts._id} post={posts} owner={(username===user.username)} />  

      
        
        }
        </>
        
      </div>
    </div>
  )
}

export default SFeed