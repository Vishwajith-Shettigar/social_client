import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE={
    user:{
        "_id": "63501a9770507286f448ff4e",
        "username": "pokemon",
        "email": "pokemon@gmail.com",
        "password": "$2b$10$A8EAKi.SmMaYH6wo45WFj.XY97JWSWYIYPhPZRB.8bLn0/Pn9WWva",
        "profilePicture": "5.jpg",
        "coverPicture": "",
        "followers": [
          "63481052fae326fe47d09bd8",
          "6357649efcae42174066262a"
        ],
        "following": [
          "63481052fae326fe47d09bd8",
          "6357649efcae42174066262a"
        ],
        "isAdmin": false,
        "createdAt": {
          "$date": {
            "$numberLong": "1666194071430"
          }
        },
        "updatedAt": {
          "$date": {
            "$numberLong": "1666672192570"
          }
        },
        "__v": 0
      }
    
    ,
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