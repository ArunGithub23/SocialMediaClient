import React from 'react';
import Logo from '../../img/logo.png'
import './LogoSearch.css'
import {UilSearch} from '@iconscout/react-unicons'


const LogoSearch = () => {
  return (
    <div className='LogoSearch'>
      <img src={Logo} alt="img"></img>
      <div className='Search'>
        <input type='search' placeholder='#Explore'/>
        <div className='s-icon'>
          <UilSearch/>
        </div>
      </div>
      
    </div>
  )
}

export default LogoSearch
