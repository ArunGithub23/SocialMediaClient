import React, { useEffect, useState } from 'react'
import "./RightSide.css"
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import {UilSetting} from '@iconscout/react-unicons'
import TrendCard from '../TrendCard/TrendCard'
import { Link } from 'react-router-dom'
import Chat from '../Chat/chat'
import UserListPanel from '../Chat/users'
import { useSelector } from 'react-redux'


const RightSide = () => {
  const [chatuser,setchatuser]=useState(false)
  let  x= useSelector((state) => state.authReducer.chatuser);

useEffect(()=>{
  console.log('chat user iss1122',x);
  
setchatuser(x)
},[x])

  return (
    <div className='RightSide'>
      
      <div className='navIcons'>
        <Link to="../home"><img src={Home} alt='#'/></Link>
        <UilSetting/>
        <img src={Noti} alt=''/>
        <Link to='/chat'> <img src={Comment} alt=''/></Link>
      </div>

      {/* <TrendCard/> */}
      {/*  */}
     {chatuser?.state ?  <Chat/> : <UserListPanel />}
      {/* <button className='button r-button' >Share</button> */}
    </div>
  )
}

export default RightSide
