import React, { useState } from 'react';
import Logo from '../../img/logo.png'
import './LogoSearch.css'
import {UilSearch} from '@iconscout/react-unicons'
import UserModal from "../UserSearchModal/UserModal";



const LogoSearch = () => {
  const [isOpen,setisOpen]=useState(false)
  const [searchinput,setsearchinput]=useState('')

//   const onrender=(prev)=>{
// prev+1;
//   }


  return (
    <div className='LogoSearch'>
      <img src={Logo} alt="img"></img>
      <div className='Search'>
        <input type='search' placeholder='#Explore' onChange={(e)=>{setsearchinput(e.target.value);if(e.target.value!=''){setisOpen((prev)=>prev+1+"")}else{setisOpen(false)}}}/>
        <div className='s-icon'>
          <UilSearch/>
          <UserModal data={{ isOpen: isOpen, searchinput: searchinput }} />

        </div>
      </div>
      
    </div>
  )
}

export default LogoSearch
