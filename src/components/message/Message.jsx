import React from 'react'
import "./message.css"
import { format } from 'timeago.js'
function Message({message, own}) {
  return (
    <div className={own?'message own':"message"}>

        <div className="messageTop">
<img className="messageImg" src="data:image/jpeg;base64,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" alt="" />
<p className='messageText'>{message.text}</p>
        </div>
        <div className="messageBottom">
           {format(message.createdAt)}
        </div>
    </div>
  )
}

export default Message