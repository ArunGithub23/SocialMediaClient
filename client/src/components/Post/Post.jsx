import React, { useState } from 'react'
import "./Post.css"
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import {useSelector} from 'react-redux'
import { likePost } from '../../Api/PostRequest'



const Post = ({data}) => {
        const {user}=useSelector((state)=>state.authReducer.authData)
        const [liked,setliked]=useState(data.likes.includes(user._id))
        const [likes,setlikes]=useState(data.likes.length)

        // console.log(".env",process.env.REACT_APP_PUBLIC_FOLDER,"data.image",data.Image)
        // console.log("data is",data)

        const handlelike=()=>{
          setliked((prev)=>!prev)
         likePost(data._id,user._id)
          liked?setlikes((prev)=>prev-1):setlikes((prev)=>prev+1)
        }

  return (
    <div className='Post'>
      <img src={data.Image?process.env.REACT_APP_PUBLIC_FOLDER+data.Image:""} alt=''/>

        <div className='postReact'>
            <img src={liked?Heart:NotLike} style={{cursor:"pointer"}} onClick={handlelike}></img>
            <img src={Comment}></img>
            <img src={Share}></img>
        </div>

        <span>{likes}likes</span>
        <div className='datail'>
            <span><b>{data.name}</b></span>
            <span>{data.desc}</span>
        </div>


    </div>
  )
}

export default Post
