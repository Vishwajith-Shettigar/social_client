import React from 'react'
import "./gmessage.css"
import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { format } from 'timeago.js'
import {AuthContext} from '../../context/AuthContext'
function Gmessage({message}) {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER
    const {user}=useContext(AuthContext);
    if(message.userid!==user._id){
        message.owner=false;
    }else{
        message.owner=true;
    }
  return (
    <div className={message.owner===true?'gmessage gown':"gmessage"}>

        <div className={(!message.owner)?'gmessageTopfireign':"gmessageTop"}>
            <Link to={`/profile/${message.username}`}>
<img className="gmessageImg" src={message.userImg?PF+"/person/"+message.userImg:PF+"/person/noAvatar.png"} alt="" />
</Link>
<div className="gmessagebody">
    <p className="gusername">{message.username}</p>
    <p className='gmessageText'>{message.text}</p>
      
       
          </div>
    </div>
</div>

  )
}

export default Gmessage