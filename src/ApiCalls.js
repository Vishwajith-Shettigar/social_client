import axios from "axios";

export const loginCall= async(userCredential,dispatch,setJwtToken)=>{

    dispatch({type:"LOGIN_START"});

    try{
        const res= await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`,userCredential);
        console.log("Log in ---------->"+ res)
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})

        setJwtToken("userId",res.data._id,{maxAge: 172800});


    }
    catch(err)
    {
        dispatch({type:"LOGIN_FAILURE",payload:err})
    }

}