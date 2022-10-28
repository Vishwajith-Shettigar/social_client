import React from 'react'
import "./comment.css"
import { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { DeleteForever } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext'
function CommentChild({c,postUserid,postid,commentsPNow,setCommentsPNow}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
    const {user} =useContext(AuthContext);
    const [commentsNow,setCommentsNow]=useState(c)
    const [commentUser, setCommentUser] = useState({});

const deleteComment=async()=>{
    
  const res=  await axios.post("/post/deleteComment/"+postid,{

        userid:user._id,
postuserid:postUserid,
commentuserid:commentsNow.userid,
commentid:commentsNow._id
    })

   

    const cmnts=  await axios.get("/post/getComments/"+postid)
   
    await  setCommentsNow(cmnts.data)
   
    

}

    useEffect(() => {
        
       
        const fetchuser = async() => {
//  console.log(comment.userid);
            const res = await axios.get(`/user?userid=${c.userid}`)
            setCommentUser(res.data);
            
        }
        fetchuser();
    }, [commentsNow])


  return (
   <>
     <div className="commentBoxComment">
                <img className="commentUserImg" src={commentUser.profilePicture? PF + "/person/"+commentUser.profilePicture: PF + "/person/noAvatar.png"}></img>
                <div className="commentBoxUserInfo">
                    <span className="commentUsername">{commentUser?.username}</span>
                    <span className="comment">{commentsNow?.text}</span>



                </div>

           {    
           postUserid===user._id || c.userid==user._id?
           <DeleteForever onClick={deleteComment} className="deleteComment"/>:<></>
           
           }

            </div>

          

           
   </>
  )
}

export default CommentChild