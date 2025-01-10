import React, { useEffect, useState } from 'react'
import "./Post.css"
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import deleteicon from '../../img/deleteIcon2.png'

import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import {useDispatch, useSelector} from 'react-redux'
import { deletePost, likePost } from '../../Api/PostRequest'
import { deletePostAction } from '../../actions/postAction'



const Post = (props) => {
        const {user}=useSelector((state)=>state.authReducer.authData)
        const [liked,setliked]=useState(props?.data?.likes.includes(user?._id))
        const [likes,setlikes]=useState(props?.data?.likes.length)

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
          
          dispatch(deletePostAction({id,userid}))
        }
  return (
    <div className='Post'>
      <img src={props?.data.Image} alt='no img'/>

        <div className='postReact'>
            <img src={liked?Heart:NotLike} style={{cursor:"pointer"}} onClick={handlelike}></img>
            <img src={Comment}></img>
            <img src={Share}></img>
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
