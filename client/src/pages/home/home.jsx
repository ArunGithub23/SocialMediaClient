import React from 'react';
import './Home.css'
import ProfileSide from '../../components/ProfileSide/ProfileSide';
import PostSide from '../../components/PostSide/PostSide';
import RightSide from '../../components/RightSide/RightSide';
import Chat from '../../components/Chat/chat';

const Home = () => {
  return (
    <div className='Home'>
      <ProfileSide/>
      <PostSide/>
      <RightSide/>
      {/* <Chat/> */}
      
    </div>
  )
}

export default Home
