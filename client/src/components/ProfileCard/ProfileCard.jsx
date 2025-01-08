import React, { useEffect, useState } from 'react'
import './ProfileCard.css'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate,  } from 'react-router-dom'
import { SetShowListOf } from '../../actions/AuthAction'

const ProfileCard = () => {

  const {user}=useSelector((state)=>state.authReducer.authData)
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER
 const navigate= useNavigate()
 const dispatch = useDispatch();
 let selecteduser=useSelector((state) => state.authReducer.selecteduser)
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


 const toggleButton=(e)=>{
    const currentColor=e.currentTarget.style.background 
    e.currentTarget.style.background ="white"
    // console.log('e.target is', e.currentTarget.style.background );

    e.currentTarget.style.background = currentColor ===   "white" ?"rgb(184, 146, 64)": "white";
    dispatch(SetShowListOf('following'))
    }

    const toggleButton1=(e)=>{
        const currentColor=e.currentTarget.style.background 
        e.currentTarget.style.background ="white"
        // console.log('e.target is', e.currentTarget.style.background );
    
        e.currentTarget.style.background = currentColor ===   "white" ?"rgb(184, 146, 64)": "white";
        dispatch(SetShowListOf('followers'))
        }


  return ( <div className='ProfileCard'>
        <button onClick={()=>{navigate("../home")}}> Back</button>
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
                <div className='follow' onClick={toggleButton}>
                    <span>{user.following.length}</span>
                    <span>Following</span>
                </div>
                <div className='vl'></div>
                <div className='follow' onClick={toggleButton1}>
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
