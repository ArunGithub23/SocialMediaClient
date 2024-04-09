import React from 'react'
import './ProfileCard.css'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const ProfileCard = () => {

  const {user}=useSelector((state)=>state.authReducer.authData)
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER


  return (
    <div className='ProfileCard'>
        <div className='ProfileImages'>
           <img src={user.coverPicture?serverPublic+user.coverPicture:serverPublic+"defaultCover.jpg"} alt=''/> 
           <img src={user.profilePicture?serverPublic+user.profilePicture:serverPublic+"defaultProfile.png"}/>
        </div>

        <div className='ProfileName'>
            <span>{user.firstname}{"  "+user.lastname}</span>
            <span>{user.worksAt?user.worksAt:"Write About Yourself"}</span>
        </div>

        <div className='followStatus'>
            <hr/>
            <div>
                <div className='follow'>
                    <span>{user.following.length}</span>
                    <span>Following</span>
                </div>
                <div className='vl'></div>
                <div className='follow'>
                    <span>{user.followers.length}</span>
                    <span>Followers</span>
                </div>

            </div>
            <hr/>
        </div>
        <span >
            <Link state={{ decoration:"none",color:"inherit"}} to={`/profile/${user._id}`}> My Profile</Link>
           </span>
      
    </div>
  )
}

export default ProfileCard
