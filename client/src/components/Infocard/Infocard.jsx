import React, { useState } from "react";
import "./Infocard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";

const Infocard = () => {
  const [modalOpened, setModalOpened] = useState(false);

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
        <span>in RelationShip</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in</b>
        </span>
        <span>Multan</span>
      </div>
      <div className="info">
        <span>
          <b>WOrks at</b>
        </span>
        <span>india</span>
      </div>
      <button className="button">Logout</button>
    </div>
  );
};

export default Infocard;
