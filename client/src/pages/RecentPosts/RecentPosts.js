import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../.././components/Post/Post";
import "../.././components/Posts/Posts.css";
import { getRecentPosts } from "../../actions/postAction";

const RecentPosts = () => {
  const dispatch = useDispatch();
  let { recentposts, loading } = useSelector((state) => state.postReducer);


  useEffect(() => {
    dispatch(getRecentPosts());
  }, []);
  
  return (
    <div className="Posts">

      {loading
        ? "Fetching posts...."
        : recentposts?.map((post, id) => {
            return <Post data={post} key={id} />;
            
          })}
    </div>
  );
};

export default RecentPosts;