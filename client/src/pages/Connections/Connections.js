import React, { useEffect, useState } from 'react'
import { useParams,Link, useNavigate } from "react-router-dom";
import './Connections.css'
import { useSelector } from 'react-redux';
import defaultProfile from '../../img/defaultProfile.png';

const Connections = () => {
    const { type, id } = useParams();
    const [user,setUser] = useState();
    // let connections = [];
    const [connections,setConnections] = useState([]);
    
    const [connectionsInfo,setConnectionsInfo] = useState([]);

    const following= useSelector((state)=>state.authReducer.authData.user.following)
     const navigate= useNavigate()
    

    console.log("Route ", type, id);
    const BaseUrl = process.env.REACT_APP_BaseUrl1;


    const fetchUser = async()=>{ 

      try {
        const response = await fetch(`${BaseUrl}/user/${id}`);
        const json = await response.json();
        setUser(json)
        if (type === "following"){ 
            console.log("inside if following")
            setConnections(json.following);
            // connections = user.following;
        }
        else if(type === "follower"){
            console.log("inside if follower")
            setConnections(json.followers);
            // connections = user.followers;            ;
        }
        console.log("connections ",connections);
        console.log("user ", json);
        
      } catch (error) {
        console.log(error);
        
      }
       
    }


    async function fetchAllUsers() {
        try {
          const response = await fetch(`${BaseUrl}/user/allusers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(),
          });
    
          const result = await response.json();
          // console.log('Fetched users:', result);
          // let followerinfo1=[]
          // Map and filter users
          const followerInfoList = result
            .filter((user) => connections.includes(user._id))
            .map((user) => ({
              username: user.username,
              firstname: user.firstname,
              img: "",
              id: user._id,
            }));
          console.log("info", followerInfoList);
          setConnectionsInfo(followerInfoList);
          return result;
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }



      useEffect(()=>{ 
        fetchUser();
      },[]);

      useEffect(()=>{ 
        fetchAllUsers();
      },[connections])



  return (
    <div className='connections'>
      <div className="connections-header">
      <button className="connections-header-button" onClick={()=>{navigate(-1)}}> {`←`} </button> 
      <div >{user?.firstname}</div>
      <div></div>
       
     </div>
     
      {connectionsInfo.length > 0 ? (
          <ul className="user-list">
            {connectionsInfo.map((user) => {
                console.log("user.firstname",user.firstname);
                
                return(
                  <Link className="my-link-c" key={user.id} to={`/mobile/userprofile/${user?.id}`}> 
              <li  className="user-item"  
              >
                
                <img src={user?.image? user?.image : defaultProfile } alt={user.username} className="user-image" />
                <div className="user-details" style={{color:'black'}}>
                  <p><strong style={{color:'black'}}>{user.firstname}</strong></p>
                  <p>@{user.username}</p>
                </div>
             <button className="follow-btn">
                 {following.includes(user.id)?"Unfollow":"Follow"}
            </button>
              
              </li>
              </Link>
                )
   }   )}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
    </div>
  )
}

export default Connections
