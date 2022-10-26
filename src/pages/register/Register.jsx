import React, { useRef } from 'react'
import "./register.css"
import { Navigate, useNavigate } from 'react-router-dom';

import axios from 'axios';
function Register() {

    const username=useRef();
    const email=useRef();
    const password=useRef();
    const comPassword=useRef();
const navigate=useNavigate();

const handleLogin=async(e)=>
{
    
 e.preventDefault();

    if(password.current.value != comPassword.current.value)
    {
 password.current.setCustomValidity("Password don't match");
    }else{
       
           const user={
            username:username.current.value,
            email:email.current.value,
            password:password.current.value
           }
          try{
           const res=await axios.post("/auth/register",user);
navigate("/login")
          }

catch(e){
    

}
    }
    

   

}

  return (
    <div className='login'>
<div className="loginWrapper">
    <div className="loginLeft">
        <h3 className="loginLogo">Dont befraid</h3>
        <span className="loginDesc">By loging in you are about to follow our guildlines</span>
    </div>
    <div className="loginRight">

        <form onSubmit={handleLogin} className="loginBox">
            <input required ref={username} placeholder='User name' className="loginInput" />
            <input required type="email" ref={email} placeholder='Email' className="loginInput" />
            <input required type="password" ref={password} placeholder='Password' className="loginInput" />
            <input required type="password" ref={comPassword} placeholder='Confirm password' className="loginInput" />
 <button type='submit' className="loginButton">Sign up</button>
 <button className="loginRegister" onClick={()=> navigate("/login")}>Log in</button>
        </form>
    </div>
</div>
    </div>
  )
}

export default Register