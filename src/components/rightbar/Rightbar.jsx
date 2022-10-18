import React from 'react'
import "./rightbar.css"
import {Users} from "../../dummyData"
import Online from '../online/Online'
function Rightbar({user}) {

 const  HomeRightbar=()=>{

    return(
      <>
      <div className="birthdayContainer">
        <img src="/assets/gift.png" className='birthdayImg'/>
        <span className='birthdayTest'><b>Pola</b> and <b>3 others</b>  have birthday today </span>
  </div> 
  <img src="/assets/ad.png" alt="" className="rightbarAd" />
  <h4 className="rightbarTitle">Online friends</h4>

  <ul className="rightbarFriendList">
   
 {  Users.map((u)=>(
     <Online key={u.id} user={u}/>
   ))
  }
  
   
  </ul>
      </>
    )
  }

  const ProfileRightbar=()=>{

    return(
      <>
      <h4 className='rightbarTitle'>User information </h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City</span>
          <span className="rightbarInfoValue"> {user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From</span>
          <span className="rightbarInfoValue"> {user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship</span>
          <span className="rightbarInfoValue"> {user.relationship==1?"single" :user.relationship==2? "married" :"---"}</span>
        </div>
       
      </div>

      <h4 className='rightbarTitle'>User friends </h4>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          <img src="/assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Joe deon</span>
        </div>

        <div className="rightbarFollowing">
          <img src="/assets/person/4.jpg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Joe deon</span>
        </div>

        <div className="rightbarFollowing">
          <img src="/assets/person/2.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Joe deon</span>
        </div>

        <div className="rightbarFollowing">
          <img src="/assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Joe deon</span>
        </div>

        <div className="rightbarFollowing">
          <img src="/assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Joe deon</span>
        </div>

        <div className="rightbarFollowing">
          <img src="/assets/person/2.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Joe deon</span>
        </div>
      </div>
      </>
    )
  }
  return (
    <div className='rightbar'>

      <div className="rightbarWrapper">
{user?<ProfileRightbar/>:<HomeRightbar/>}
     </div>
    </div>
  )
}

export default Rightbar
