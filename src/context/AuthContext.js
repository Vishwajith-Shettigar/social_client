import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE={
    user:{

        
            "_id": {
              "$oid": "63481052fae326fe47d09bd8"
            },
            "username": "vish",
            "email": "vish@gmail.com",
            "password": "$2b$10$Nkw9kZPTQShwo5GsP.tE9.ZzhARwSODtw1zJ/y4omJ.HUYV4FW73G",
            "profilePicture": "7.jpg",
            "coverPicture": "https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg?auto=compress&cs=tinysrgb&w=300",
            "followers": [
              "63482a69f32e44db8c9068ad"
            ],
            "following": [],
            "isAdmin": false,
            "createdAt": {
              "$date": {
                "$numberLong": "1665667154156"
              }
            },
            "updatedAt": {
              "$date": {
                "$numberLong": "1665679377551"
              }
            },
            "__v": 0,
            "desc": "Hello i am vish"
          
    },
    isFetching:false,
    error:false
}

export const AuthContext=createContext(INITIAL_STATE)

export const AuthContextProvider= ({children})=>{

    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE)
    return (
        <AuthContext.Provider value={{user:state.user,isFetching:state.isFetching,error:state.error, dispatch}}>
{children}
        </AuthContext.Provider>
    )
}