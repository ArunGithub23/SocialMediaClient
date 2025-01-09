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
        
        <div className='Posts-container'>
          <h3 className='Posts-heading'>View Your Posts</h3>
          <Posts/>
        </div>


    </div>
  )
}

export default PostSide
