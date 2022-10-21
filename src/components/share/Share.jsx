import { EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import "./share.css"
import { useRef } from 'react'
import axios from 'axios'
function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const desc = useRef();
const handleSubmit=async(e)=>{
    e.preventDefault();
    const newPost={
        userid:user._id.$oid,
        desc:desc.current.value
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

    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src={user.profilePicture ? PF+"/person/"+ user.profilePicture : PF + "/person/noAvatar.png"} />
                    <input type="text" placeholder='Whats in your mind ?' className="shareInput" ref={desc} />

                </div>
                <hr className="shareHr" />
                <form onSubmit={handleSubmit} className="shareBottom">
                    <div className="shareOptions">

                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className="shareOptionText">Photo or video</span>
                            <input style={{ display: "none" }} id="file" type="file" accept=".png,.jpeg,.jpg,.mp4" onChange={(e) => { setFile(e.target.files[0]) }} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor='blue' className='shareIcon' />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor='green' className='shareIcon' />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button type="submit" className='shareButton'>Share</button>
            </form>
        </div>
        </div >
    )
}

export default Share