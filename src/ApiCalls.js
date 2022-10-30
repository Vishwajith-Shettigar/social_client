import axios from "axios";

export const loginCall= async(userCredential,dispatch,setJwtToken)=>{

    dispatch({type:"LOGIN_START"});

    try{
        const res= await axios.post("/auth/login",userCredential);
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})

        setJwtToken("userId",res.data._id,{maxAge: 172800});


    }
    catch(err)
    {
        dispatch({type:"LOGIN_FAILURE",payload:err})
    }

}