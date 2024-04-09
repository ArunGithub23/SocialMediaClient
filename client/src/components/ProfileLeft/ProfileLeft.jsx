import React from 'react'
import './ProfileLeft.css'
import LogoSearch from '../LogoSearch/LogoSearch'
import Infocard from '../Infocard/Infocard'
import FollowersCard from '../FollowersCard/FollowersCard'



const ProfileLeft = () => {
  return (
    <div className='ProfileLeft'>
      <LogoSearch/>
      <Infocard/>
      <FollowersCard/>
    </div>
  )
}

export default ProfileLeft
