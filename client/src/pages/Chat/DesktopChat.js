import React, { useEffect, useState } from 'react'
import Chat from '../../components/Chat/chat'
import UserListPanel from '../../components/Chat/users'
import './DesktopChat.css'
import { useSelector } from "react-redux";

const DesktopChat = () => {
  let  prevchatuser= useSelector((state) => state.authReducer.chatuser);
  const [mobile,setMobile] = useState(false);
    // Detect screen size
    useEffect(() => {
      const handleResize = () => {
        setMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
      };
      handleResize(); // Check on initial load
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (<>
    {
      !mobile ? ( 
        <div className='desktop-chat-container'>
        <div className='dc-user-panel'>
        <UserListPanel/>
        </div>
        <div className='dc-chat'>
        <Chat/>
        </div>
       
      </div>):
      ( <div className='desktop-chat-container'>
        {!prevchatuser?.state ? <div className='dc-user-panel'>
        <UserListPanel/>
        </div> :  <div className='dc-chat'>
        <Chat/>
        </div>
       }
        
       
      </div>)
    }
    </>
   
  )
}

export default DesktopChat
