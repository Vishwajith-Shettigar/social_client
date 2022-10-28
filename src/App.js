import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Comment from "./components/comment/Comment";
function App() {

  const {user}=useContext(AuthContext)


  return (
    <Router>
<Routes>

  <Route exact path="/" element={user?<Home/>:<Register/>}></Route>
  <Route path="/login" element={user? <Navigate to="/"/> :<Login/>}></Route>
  <Route path="/register" element={user?<Navigate to="/"/> : <Register/>}></Route>
  <Route path="/messenger" element={!user?<Navigate to="/"/> : <Messenger/>}></Route>
<Route path="/comment" element={ <Comment/>}></Route>
  <Route path="/profile/:username" element={<Profile/>}></Route>
</Routes>
    </Router>
    

  );
}

export default App;
