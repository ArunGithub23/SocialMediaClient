import React, { useState } from "react";
import "./Infocard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/AuthAction";

const Infocard = () => {

  const [modalOpened, setModalOpened] = useState(false);
   const [data,setData]=useState({firstname:"",lastname:"",password:"",confpass:"",username:""})
   const {user}=useSelector((state)=>state.authReducer.authData)

  
  const dispatch=useDispatch()




  const handleLogout =()=>{
    localStorage.clear('profile')
  }

  return (
    <div className="InfoCard">

      <div className="infoHead">
        <h4>Your Info </h4>
        <UilPen
          width="2rem"
          height="1.2rem"
         onClick={()=>{setModalOpened(true)}}
        />
        <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
        
      </div>
      <div className="info">
        <span>
          <b>Status</b>
        </span>
        <span>{user?.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in</b>
        </span>
        <span>{user?.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at</b>
        </span>
        <span>{user?.worksAt}</span>
      </div>
      <button className="button" onClick={()=>{    dispatch(logout())  }}>Logoutd</button>
    </div>
  );
};

export default Infocard;
