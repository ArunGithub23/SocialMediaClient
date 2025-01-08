import React from 'react'
import Noti from '../../img/noti.png'
import { Link } from 'react-router-dom'
import Comment from '../../img/comment.png'
import {UilSetting} from '@iconscout/react-unicons'
import Home from '../../img/home.png'
import './Navbar.css'




const Navbar = () => {
  return (
    
       <div className='Navbar-container'>
              <Link to="../home"><img src={Home} alt='#'/></Link>
              <UilSetting/>
              <img src={Noti} alt=''/>
              <Link to='/chat'> <img src={Comment} alt=''/></Link>
            </div>
  )
}

export default Navbar
