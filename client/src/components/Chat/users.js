import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import './UserListPanel.css';
import { Link, useNavigate } from "react-router-dom";
import { ChatUserClicked } from '../../actions/AuthAction';


const   UserListPanel = ({setid}) => {

const [users,setusers]=useState([])
const dispatch = useDispatch();
let  prevchatuser= useSelector((state) => state.authReducer.chatuser);
const BaseUrl = process.env.REACT_APP_BaseUrl1;



const loggeduser=localStorage.getItem('user')

const navigate = useNavigate();

const goBack = () => {
  navigate(-1); // Go back to the previous route
};


const setSelectedChatUser = (id,name) => {
    // console.log('selecteduserId after click',selecteduserId);
    if(prevchatuser==true){   
         dispatch(ChatUserClicked());
    }
    else{
        dispatch(ChatUserClicked({id,name,state:true}));

    }
  };


useEffect(()=>{
    const test=async()=>{


      try {
        // const data={senderid,recipient}
    
        const response=await fetch(`${BaseUrl}/user/allusers`,{
          method:'post',
          headers:{'content-type':"application/json"},
          body:JSON.stringify({})
      });
          const response1=await response.json()
          // console.log('chat response is ',response1)
          setusers(response1)
          // updaterecipient(response1.result1.recipientid)

      
      } catch (error) {
        console.log(error);
        
      }
        

}
test()

},[])





  return (
    <div className="user-list-panel">
      <div className="user-list-header">
      {/* <button
      onClick={goBack}
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
       
        fontSize: "1rem",
      }}
    >
      <span style={{ marginRight: "8px", fontSize: "1.5rem" }}>←</span> Back
    </button> */}
      
        <h3>Chat  With Others</h3>
      </div>

      <div className="user-list">
        {users.map((user) => (
          
          <div
            key={user.userid}
            className="user-item"
            onClick={() => {
                console.log('');
                setSelectedChatUser(user._id,user.username);
                // setid(user.userid,user.username)

            }}
          >
           
           
         
            <div className="avatar">{user?.username.charAt(0).toUpperCase()}</div>
            <div className="user-info">
              <div className="user-name">{user?.username}</div>
              <div className="user-last-message">
                {user.lastMessage || 'No messages yet'}
              </div>
            </div>
            
          </div>



        ))}
      </div>
    </div>
  );
};

export default UserListPanel;
