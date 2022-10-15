import React from 'react'
import "./register.css"

function Register() {
  return (
    <div className='login'>
<div className="loginWrapper">
    <div className="loginLeft">
        <h3 className="loginLogo">Dont befraid</h3>
        <span className="loginDesc">By loging in you are about to follow our guildlines</span>
    </div>
    <div className="loginRight">

        <div className="loginBox">
            <input placeholder='User name' className="loginInput" />
            <input placeholder='Email' className="loginInput" />
            <input placeholder='Password' className="loginInput" />
            <input placeholder='Confirm password' className="loginInput" />
 <button className="loginButton">Sign up</button>
 <button className="loginRegister">Log in</button>
        </div>
    </div>
</div>
    </div>
  )
}

export default Register