import RecentPosts from "../pages/RecentPosts/RecentPosts";

const postReducer = (
    state = { posts: null,recentposts:null, loading: false, error: false, uploading: false },
    action
  ) => {
    switch (action.type) {
      // belongs to PostShare.jsx
      case "UPLOAD_START":
        return { ...state, error: false, uploading: true };
      case "UPLOAD_SUCCESS":
        return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false };
      case "UPLOAD_FAIL":
        return { ...state, uploading: false, error: true };
      // belongs to Posts.jsx
      case "RETREIVING_START":
        return { ...state, loading: true, error: false };
      case "RETREIVING_SUCCESS":
        
        return { ...state, posts: action.data, loading: false, error: false };
      case "RETREIVING_FAIL":
        return { ...state, loading: false, error: true };
        case "RETREIVING_FAIL_DELETE":
        return { ...state, loading: false, error: false };
     

         // belongs to RecentPosts.jsx
      case "RECENTPOSTS_RETREIVING_START":
        return { ...state, loading: true, error: false };
      case "RECENTPOSTS_RETREIVING_SUCCESS":
        
        return { ...state, recentposts: action.data, loading: false, error: false };
      case "RECENTPOSTS_RETREIVING_FAIL":
        return { ...state, loading: false, error: true };
      default:
        return state;
    }
  };
  
  export default postReducer;