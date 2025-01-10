import React from 'react'
import searchIcon2 from '../../img/searchicon2.png'
import { Link } from 'react-router-dom'
import Comment from '../../img/comment.png'
import {UilSetting} from '@iconscout/react-unicons'
import Home from '../../img/home.png'
import './Navbar.css'
import { useSelector } from 'react-redux'




const Navbar = () => {

    
    const user=useSelector((state)=>state?.authReducer?.authData.user)
    console.log('user in navbar',user);

  return (
    
       <div className='Navbar-container'>
              <Link to='/mobile/TimeLine'><img src={Home} alt='#'/></Link>
              
              <Link  to={`/mobile/search`}>              <img src={searchIcon2} alt=''/>             </Link>

              <Link to='/chat'> <img src={Comment} alt=''/></Link>
              <Link to={`/mobile/profile/${user?._id}`}>              <UilSetting/>     </Link>
            </div>
  )
}

export default Navbar
