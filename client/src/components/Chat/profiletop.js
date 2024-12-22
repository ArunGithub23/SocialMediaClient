import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChatUserClicked } from '../../actions/AuthAction';
// import arun from '../Assets/arun.png' 


const Profiletop = ( {user}) => {

    // const username=localStorage.getItem('user')
    const [username,setusername]=useState(null);
    const dispatch = useDispatch();
    let  prevchatuser= useSelector((state) => state.authReducer.chatuser);


    console.log("user argument",user);
    

    useEffect(()=>{
        // console.log("prevchatuser is ",prevchatuser );
        
        setusername(prevchatuser.name);
    },[prevchatuser])

//
const setSelectedChatUser = (selecteduser) => {
    if(prevchatuser.state==true){ 
           dispatch(ChatUserClicked(false));
    }
    else{
        dispatch(ChatUserClicked(true));

    }
  };


  return (
    <div className='profile-container'>
      <div className='img-container'>
        {/* <div>
        <img src={"arun"}/> 

        </div> */}
        <button
      onClick={setSelectedChatUser}
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
       
        fontSize: "1rem",
      }}
    >
      <span style={{ marginRight: "0px", fontSize: "1.5rem" }}>←</span> Back
    </button>
        
        <div className='username' >

            {username}
        </div>
      </div>
    </div>
  )
}

export default Profiletop
