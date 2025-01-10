import React, { useEffect, useState } from 'react'
import "./Post.css"
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import deleteicon from '../../img/deleteIcon2.png'

import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import {useDispatch, useSelector} from 'react-redux'
import { likePost } from '../../Api/PostRequest'
import { deletePostAction } from '../../actions/postAction'



const Post = (props) => {
        const {user}=useSelector((state)=>state.authReducer.authData)
        const [liked,setliked]=useState(props?.data?.likes.includes(user?._id))
        const [likes,setlikes]=useState(props?.data?.likes.length)
        let { posts } = useSelector((state) => state.postReducer);

        const dispatch=useDispatch()
        console.log("data is",props?.data)

        const handlelike=()=>{
          setliked((prev)=>!prev)
         likePost(props?.data?._id,user?._id)
          liked?setlikes((prev)=>prev-1):setlikes((prev)=>prev+1)
        }

        const handleDelete=()=>{
          
          const id=props?.data?._id
          const userid=user?._id

          console.log("id is",id,userid);
           const updatedposts=posts.filter((post)=> post?._id!== id)
          
          dispatch(deletePostAction({id,userid,updatedposts}))
        }



        const shareOnOtherApps = async (post) => {
          // const { title, content, _id } = post;
          const postUrl = props?.data?._id; // Generate dynamic URL
        
          if (navigator.share) {
            try {
              await navigator.share({
                title:  'Check this out!',
                text:  'Amazing post on our platform!',
                url: `${postUrl}`, // Use the generated URL
              });
              console.log('Post shared successfully');
            } catch (error) {
              console.error('Error while sharing:', error);
            }
          } else {
            alert('Sharing is not supported on this device.');
          }
        };
        


  return (
    <div className='Post'>
      <img src={props?.data?.Image} alt='no img'/>

        <div className='postReact'>
            <img src={liked?Heart:NotLike} style={{cursor:"pointer"}} onClick={handlelike}></img>
            <img src={Comment}></img>
            <img src={Share}  onClick={shareOnOtherApps}></img>
        {props?.delete ? (   <img src={deleteicon}  onClick={handleDelete }></img>):(<></>)}
        </div>

        <span>{likes}likes</span>
        <div className='datail'>
            <span><b>{props?.data?.name}</b></span>
            <span>{props?.data?.desc}</span>
        </div>


    </div>
  )
}

export default Post
