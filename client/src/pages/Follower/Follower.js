import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FollowButtonClicked } from '../../actions/AuthAction';
import FollowersCard from '../../components/FollowersCard/FollowersCard';
import './Follower.css'

const Follower = () => {
    const [isClicked,setIsClicked]=useState()
    const dispatch=useDispatch()
    const followclicked=useSelector((state) => state.authReducer.followclicked);
    console.log("followclicked",followclicked);
    
    useEffect(()=>{


    },[])

   const  setFollowClicked=()=>{
    dispatch(FollowButtonClicked(false))
    }
    

  return (
    <div className='Follower-container'> 
      <button onClick={setFollowClicked}>Back</button>
        <FollowersCard/>
   </div>

  )
}

export default Follower
