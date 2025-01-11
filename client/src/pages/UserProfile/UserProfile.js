import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link,useParams } from 'react-router-dom'
import Post from '../../components/Post/Post';
import Cover from '../../img/cover.jpg'
import Profile from '../../img/defaultProfile.png'
import './UserProfile.css'

const UserProfile = () => {



    const [mobile,setMobile] = useState(false);

  
      // Detect screen size
      

    const [user,setUser] = useState({});
    const [posts,setPosts] = useState([]);
    const { id } = useParams();
    const BaseUrl = process.env.REACT_APP_BaseUrl1;

    const fetchUser = async()=>{ 
        const response = await fetch(`${BaseUrl}/user/${id}`);
        const json = await response.json();
        setUser(json)
        console.log("user ", json);
    }

    const fetchUserPosts = async()=>{ 
        const response = await fetch(`${BaseUrl}/post/${id}`,{ 
            method:'POST',
            headers: {
                "Content-Type": "application/json", 
            } 
        });
        const json = await response.json();
        setPosts(json);
        console.log("user posts ", json);
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
          <div className="follow">
            <span>{user?.following?.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user?.followers?.length}</span>
            <span>Followers</span>
          </div>
        </div>
        <hr />
      </div>
    </div>
  
    <div className="Posts">
      {posts.map((post, id) => {
        return <Post data={post} key={id} />;
      })}
    </div>
  </div>
  
  )
}

export default UserProfile
