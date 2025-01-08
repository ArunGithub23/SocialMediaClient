import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChatUserClicked } from '../../actions/AuthAction';
// import arun from '../Assets/arun.png' 


const Profiletop = ( {user}) => {

    // const username=localStorage.getItem('user')
    const [username,setusername]=useState(" ");
    const dispatch = useDispatch();
    let  prevchatuser= useSelector((state) => state.authReducer.chatuser);


    console.log("user argument",user);
    

    useEffect(()=>{
        console.log("prevchatuser is ",prevchatuser );
        if(prevchatuser?.name!=""){        setusername(prevchatuser?.name);
        }
    },[prevchatuser])

//
const setSelectedChatUser = (selecteduser) => {
  const id=prevchatuser?.id
  const name=prevchatuser?.name
    if(prevchatuser.state==true){ 
           dispatch(ChatUserClicked({id,name,state:false}));
    }
    else{
        dispatch(ChatUserClicked({id,name,state:true}));

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
