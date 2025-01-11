import React, { useEffect, useState } from 'react'
import './ProfileCard.css'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/defaultProfile.png'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate,  } from 'react-router-dom'
import { FollowButtonClicked, LatestUser, SetShowListOf } from '../../actions/AuthAction'
import Follower from '../../pages/Follower/Follower'
import Posts from '../Posts/Posts'
import PostSide from '../PostSide/PostSide'
import EditProfile from '../EditProfile/EditProfile'

const ProfileCard = () => {

    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

    const openEditProfile = () => setIsEditProfileOpen(true);
    const closeEditProfile = () => setIsEditProfileOpen(false);
  
    const followclicked=useSelector((state) => state.authReducer.followclicked);
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

        dispatch(LatestUser(user?._id))

       window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize);
     }, []);


 const toggleButton=(e)=>{
    const currentColor=e.currentTarget.style.background 
    e.currentTarget.style.background ="white"
    // console.log('e.target is', e.currentTarget.style.background );

    e.currentTarget.style.background = currentColor ===   "white" ?"rgb(184, 146, 64)": "white";
    dispatch(SetShowListOf('following'))
    dispatch(FollowButtonClicked(true))

    }

    const toggleButton1=(e)=>{
        const currentColor=e.currentTarget.style.background 
        e.currentTarget.style.background ="white"
        // console.log('e.target is', e.currentTarget.style.background );
    
        e.currentTarget.style.background = currentColor ===   "white" ?"rgb(184, 146, 64)": "white";
        dispatch(SetShowListOf('followers'))
        dispatch(FollowButtonClicked(true))
        }


  return ( 
  <div className='ProfileCard'>
        <button onClick={()=>{navigate("../home")}}> Back</button>
        <div className='ProfileImages'>
           <img src={(user?.coverPicture?serverPublic+user.coverPicture: Cover)} alt=''/> 
           <img src={user?.profilePicture? (user?.profilePicture) : Profile}/>
        </div>

        <div className='ProfileName'>
            <span>{user?.firstname}{"  "+user?.lastname}</span>
            <div>
            <button onClick={openEditProfile}>Edit Profile</button>
            <EditProfile isOpen={isEditProfileOpen} onClose={closeEditProfile} />
            </div>
            <span>{user?.worksAt?user.worksAt:"Write About Yourself"}</span>
        </div>

        
        <div className='followStatus'>
            <hr/>
            <div>
                <Link to={`/mobile/following/${user._id}`} >
                <div className='follow'>
                    <span>{user?.following?.length}</span>
                     <span>Following</span> 
                    </div>
                </Link>
                <div className='vl'></div>
                <Link to={`/mobile/follower/${user._id}`} >
                <div className='follow'>
                    <span>{user?.followers?.length}</span>
                   <span>Followers</span> 
                </div>
                </Link>

            </div>
            <hr/>
        </div>
        <span >
            <Link state={{ decoration:"none",color:"inherit"}} to={`/profile/${user?._id}`}> My Profile</Link>
           </span>

{    followclicked&&mobile? (      <Follower/> ) :(<></>) }     

{  mobile ? ( <PostSide/> ) : (<></>)}    
    </div> 
     )
}

export default ProfileCard
