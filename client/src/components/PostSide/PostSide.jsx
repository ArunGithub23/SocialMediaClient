import React from 'react'
import './PostSide.css'
import PostShare from '../PostShare/PostShare'
import Posts from '../Posts/Posts'
import { useSelector } from 'react-redux'

const PostSide = () => {
  const currentUserId= useSelector((state)=>state.authReducer.authData.user._id)
  let selecteduser=useSelector((state) => state.authReducer.selecteduser)
  


  return (
    <div className='PostSide'>

        {(currentUserId==selecteduser ? <PostShare/>:null)}
        <Posts/>
      
    </div>
  )
}

export default PostSide
