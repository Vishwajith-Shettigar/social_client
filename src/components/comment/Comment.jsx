import { Send } from '@mui/icons-material';
import React from 'react'
// import useContext from 'react';
import "./comment.css"
import { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import CommentChild from './CommentChild';
import { AuthContext } from '../../context/AuthContext'
import {useRef} from 'react'
function Comment({ comment,postid,postUserid }) {
   const {user}=useContext(AuthContext);
   const [just,setJust]=useState(true)
   const [commentsNow,setCommentsNow]=useState([])
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const text=useRef();
   
   useEffect(()=>{

    const getCommentsnew=async()=>{

  const res=  await axios.get("/post/getComments/"+postid);

  setCommentsNow(res.data);
    }
    getCommentsnew()
   },[])

    const  addComment=async()=>
   {
   
  

    const res=await axios.post("/post/comment/"+postid,{userid:user._id,text:text.current.value});
     const cmnts=  await axios.get("/post/getComments/"+postid)
   
 await  setCommentsNow(cmnts.data)

text.current.value=""
     
   }
   
    return (
        <div className="commentBox">
<div className="commentBoxInput">
                <img className="commentCurrentUserImg" src={PF + "/person/1.jpeg"}></img>
                <input className="commentInput" ref={text} placeholder="Write your comment "></input>

                <Send className="CommentSend" onClick={addComment}  />
            </div>

           { 

           commentsNow.map((c)=>(
            <CommentChild c={c} postUserid={postUserid} postid={postid} commentsPNow={commentsNow} setCommentsPNow={setCommentsNow}/>
            ))
         
           }


        </div>
    )
}

export default Comment