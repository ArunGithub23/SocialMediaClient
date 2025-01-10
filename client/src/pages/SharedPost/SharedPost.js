import React, { useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { useParams } from 'react-router-dom';

const SharedPost = () => {

    const [post, setPost] = useState(null);
    const BaseUrl = process.env.REACT_APP_BaseUrl1;
      const params = useParams()
      const id=params.id
    


    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await fetch(`${BaseUrl}/post/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error('Failed to fetch post:', error);
        }
      };
  
      fetchPost();
    }, []);
  
    
  return (
    <div>

 <h1>
    Shared To You
 </h1>
     <Post data={post}  />  
     
       </div>
  )
}

export default SharedPost
