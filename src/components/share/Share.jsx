import { Cancel, EmojiEmotions, Label, NoAccountsOutlined, PermMedia, Room } from '@mui/icons-material'
import React, { useContext, useState ,useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import "./share.css"
import { useRef } from 'react'
import {globalinfo} from "../../App"
import axios from 'axios'
function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const {mobile}=useContext(globalinfo)
    const [file, setFile] = useState(null);
    const [Anonymous,setAnonymous] = useState(false)
    const [fileExt,setfileExt]=useState("png")

  
    const desc = useRef();

    const Anonymoushandle=()=>{
        setAnonymous(!Anonymous)
    }

const handleSubmit=async(e)=>{
    
    e.preventDefault();
if(desc.current.value || file){
  
    
    const newPost={
        userid:user._id,
        desc:desc.current.value,
        anonymous:Anonymous
    }
    if(file){
        console.log(file)
        const data= new FormData();
        const fileName=String(Date.now()+file.name);
        
   console.log(data.file)
        data.append("name",fileName);

        data.append("file",file);
        newPost.img=fileName
    

      try{
        await axios.post("/upload",data);

      }catch(e)
      {

      }
    }

    try{

 await axios.post("/post",newPost);
window.location.reload()
    }catch(e)
    {

    }
}
else{
    window.alert("write")
}
}
useEffect(()=>{
    
    if(file)
    setfileExt( file.name.substring(file.name.lastIndexOf('.')+1, file.name.length) );

},[file])


    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src={user.profilePicture ? PF+"/person/"+ user.profilePicture : PF + "/person/noAvatar.png"} />
                    <textarea type="text" placeholder='Whats in your mind ?' className="shareInput" ref={desc} />

                </div>
                <hr className="shareHr" />
                {
                    file &&(

                        <div className="shareImgContainer">
                            {  (fileExt==="jpg" || fileExt==="png" || fileExt==="jpeg" || fileExt==="webp" ) ?
                            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                            :
                            <></>
                            }
                            {
                                fileExt==="mp4" || fileExt==="gif" ?
                                <>
                                 <video  alt="" className="shareImg"  controls>
                                <source src={URL.createObjectURL(file)} type="video/mp4"/>
                                </video>
                                </>
                                
                                
                                :
                                <></>
                            }
                            <Cancel className='shareCancelImg'  onClick={()=>{setFile(null)}}/>
                        </div>
                        
                    )
                }
               
                <form onSubmit={handleSubmit} className="shareBottom">
                    <div className="shareOptions">

                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className="shareOptionText">Photo or video</span>
                            <input style={{ display: "none" }} id="file" type="file" accept=".png,.jpeg,.jpg,.mp4,.webp" onChange={(e) => { setFile(e.target.files[0]) }} />
                        </label>
                        <div contenteditable="true"  className={Anonymous? "shareOption anonymousOption":"shareOption"}  onClick={Anonymoushandle}>
                            <NoAccountsOutlined htmlColor='blue' contenteditable="false" className='shareIcon' />
                            <span contenteditable="false" className="shareOptionText">Anonymous</span>
                        </div>
                       
                     { !mobile&&  <div className="shareOption">
                            <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                            <span className="shareOptionText">Feelings</span>
                        </div>}
                    </div>
                    <button type="submit" className='shareButton'>Share</button>
               
            </form>  
             
        </div> 
       
        </div >
    )
}

export default Share