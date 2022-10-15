import React from 'react'
import "./login.css"
function Login() {
  return (
    <div className='login'>
<div className="loginWrapper">
    <div className="loginLeft">
        <h3 className="loginLogo">Dont befraid</h3>
        <span className="loginDesc">By loging in you are about to follow our guildlines</span>
    </div>
    <div className="loginRight">

        <div className="loginBox">
            <input placeholder='Email' className="loginInput" />
            <input placeholder='Password' className="loginInput" />
 <button className="loginButton">Log in</button>
 <span className="loginForgot">forgon password ?</span>
 <button className="loginRegister">Create new account</button>
        </div>
    </div>
</div>
    </div>
  )
}

export default Login