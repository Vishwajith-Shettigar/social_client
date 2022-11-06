import React, { useContext } from 'react'
import "./login.css"
import { useRef } from 'react';
import {loginCall} from "../../ApiCalls";
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress, circularProgressClasses } from '@mui/material';
import { CircleOutlined } from '@mui/icons-material';

function Login({setJwtToken}) {
const {user,isFetching,error,dispatch}=useContext(AuthContext);

    const email= useRef();
    const password=useRef();

    const handleLogin=(e)=>{
 e.preventDefault();
console.log(email.current.value,password.current.value)
loginCall({email:email.current.value,password:password.current.value},dispatch,setJwtToken)
    }
    console.log(user)
  return (
    <div className='login'>
<div className="loginWrapper">
    <div className="loginLeft">
        <h3 className="loginLogo">Dont befraid</h3>
        <span className="loginDesc">By loging in you are about to follow our guildlines</span>
    </div>
    <div className="loginRight">

        <form onSubmit={handleLogin} className="loginBox">
            <input  required placeholder='Email' type="email" className="loginInput" ref={email}/>
            <input minLength={6} required placeholder='Password' type="password" className="loginInput" ref={password} />
 <button className="loginButton"> {isFetching?<CircleOutlined/>: "Log in"}</button>
 <span className="loginForgot">forgon password ?</span>
 <button type='submit' className="loginRegister">Create new account</button>
        </form>
    </div>
</div>
    </div>
  )
}

export default Login