import React, { useEffect, useState } from 'react'
import  './FollowersCard.css'
import { useDispatch, useSelector } from 'react-redux'
import { Followers } from '../../Data/FollowersData'
import { all } from 'axios'
import { UpdateSelectedUser } from '../../actions/AuthAction'


const FollowersCard = () => {
  let [followers,setFollowers]=useState([])
  let [followerinfo,setfollowerinfo]=useState([{name:"Andrew Thomas", username:"AndrewThomas",img:""}])
  const currentUserId= useSelector((state)=>state.authReducer.authData.user._id)

    const dispatch = useDispatch();
    let selecteduser=useSelector((state) => state.authReducer.selecteduser)
    const BaseUrl=process.env.REACT_APP_BaseUrl1
    
    followers=useSelector((state)=>state.authReducer.authData.user.followers)
    console.log("folloer",followers);





useEffect(()=>{
  fetchAllUsers();

},[])


   async function fetchAllUsers() {
    try {
      const response = await fetch(`${BaseUrl}/user/allusers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      });
  
     
  
      const result = await response.json();
      // console.log('Fetched users:', result);
      let followerinfo1=[]
      result.map((user)=>{
        let data={"username":user.username,"firstname":user.firstname,'img':'',id:user._id}
          if (followers.includes(user._id)){
            followerinfo1.push(data)
            
          }
      })
      console.log("info",followerinfo1);
setfollowerinfo(followerinfo1)
      return result;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
  
  // follow 

  const follow=async (usertofollow)=>{

    try {
      const response = await fetch(`${BaseUrl}/user/${usertofollow}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({currentUserId}),
      });

      // console.log("user followed....",response.json());
      
    } catch (error) {
      
    }
  }
   

  //setShowPostFor selected user

  const setSelecteduser=(selecteduserId)=>{
    // console.log('selecteduserId after click',selecteduserId);
    
    dispatch(UpdateSelectedUser(selecteduserId))
  }

  return (
    <div className='FollowersCardMain'>
            <h3>Who is Following you</h3>

    <div className='FollowersCard'>
     {console.log("testinfo2",followerinfo)}

      {followerinfo.map((follower,id)=> {
        
        return(
          <div key={followerinfo?.length} className='follower' onClick={(e)=>{if(selecteduser!=follower?.id){setSelecteduser(follower?.id)}else{setSelecteduser(currentUserId)}; // Check the current background color of the clicked element
          const currentColor = e.currentTarget.style.background;
      
          // Reset all followers' background to white
          document.querySelectorAll(".follower").forEach((el) => {
            el.style.background = "white";
          });
      
          // Toggle the background color for the clicked follower
          e.currentTarget.style.background = currentColor ===   "white" ?"rgb(184, 146, 64)": "white";
}} > 
          <div >
            <img src={follower?.img} alt="#" className='followerImg'/>
            <div className='name'>
              <span>{follower?.firstname}</span>
              <span>@{follower?.username}</span>
              </div>
            </div>
            
            <button className='button fc-button' onClick={()=>{follow(follower.id)}} >Follow</button>
          </div>
        );
      })}
    </div>
    </div>
  )
}

export default FollowersCard
