import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom'
import Post from '../../components/Post/Post';
import Cover from '../../img/cover.jpg'
import Profile from '../../img/defaultProfile.png'
import './UserProfile.css'

const UserProfile = () => {



    const [mobile,setMobile] = useState(false);
    const navigate= useNavigate()
    
    const [user,setUser] = useState({});
    const [posts,setPosts] = useState([]);
    const { id } = useParams();
    const BaseUrl = process.env.REACT_APP_BaseUrl1;

    
    const fetchUser = async()=>{ 

    try {
      const response = await fetch(`${BaseUrl}/user/${id}`);
      const json = await response.json();
      setUser(json)
      console.log("user ", json);

    } catch (error) {
      console.log(error);
      
    }
       
    }

    const fetchUserPosts = async()=>{ 

      try {
        const response = await fetch(`${BaseUrl}/post/${id}`,{ 
          method:'POST',
          headers: {
              "Content-Type": "application/json", 
          } 
      });
      const json = await response.json();
      setPosts(json);
      console.log("user posts ", json);
      } catch (error) {
        console.log(error);
        
      }
        
    }

    useEffect(()=>{
        fetchUser();
        fetchUserPosts();
    },[]);


    useEffect(() => {
        const handleResize = () => {
          setMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
        };
        handleResize(); // Check on initial load
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);  

  return (
    <div className="my-container">
    <div className="ProfileCard">

    <div className="connections-header">
      <button className="connections-header-button" onClick={()=>{navigate(-1)}}> {`←`} </button> 
       
     </div>
     
      <div className="ProfileImages">
        <img src={(Cover)} alt="" />
        <img src={user?.profilePicture ? user.profilePicture : Profile} />
      </div>
  
      <div className="ProfileName">
        <span>{user?.firstname}{" " + user?.lastname}</span>
        <span>{user?.worksAt ? user.worksAt : "Write About Yourself"}</span>
      </div>
  
      <div className="followStatus">
        <hr />
        <div>
        <Link to={`/mobile/following/${user._id}`} >
          <div className="follow">
            <span>{user?.following?.length}</span>
            <span>Following</span>
          </div>
          </Link>
          <div className="vl"></div>
          <Link to={`/mobile/follower/${user._id}`} >
          <div className="follow">
            <span>{user?.followers?.length}</span>
            <span>Followers</span>
          </div>
          </Link>
        </div>
        <hr />
      </div>
    </div>
  
    <div className="Posts">
      {posts?.map((post, id) => {
        return <Post data={post} key={id} />;
      })}
    </div>
  </div>
  
  )
}

export default UserProfile
