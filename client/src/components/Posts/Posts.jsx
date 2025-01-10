import React, { useEffect, useState } from "react";

import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";
import { getTimeLinePosts } from "../../actions/postAction";
import { UpdateSelectedUser } from "../../actions/AuthAction";

const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  let [selecteduser,setselecteduser]=useState(null)
  let x=useSelector((state) => state.authReducer.selecteduser)
  const currentUserId= useSelector((state)=>state.authReducer.authData.user._id)

  console.log('selecteduser and posts in posts file11',selecteduser,posts);
 
 if( selecteduser!= x ) { setselecteduser(x) }



  useEffect(() => {
    // console.log('selecteduser in posts file',x);
    dispatch(getTimeLinePosts(selecteduser));
  }, [selecteduser]);
  if(!posts) return 'No Posts';
  if(params.id){ posts = posts.filter((post)=> post?.userid===params?.id)}

  
  return (
    <div className="Posts">
           {   selecteduser!==currentUserId?<button onClick={ ()=>{   dispatch(UpdateSelectedUser(currentUserId)) }}> Back</button> :null}

      {loading
        ? "Fetching posts...."
        : posts.map((post, id) => {
            return <Post data={post} delete={true} key={id} />;
          })}
    </div>
  );
};

export default Posts;