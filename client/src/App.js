
import './App.css';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import Home from './pages/home/home';
import Chat from './components/Chat/chat';
import {useSelector} from 'react-redux'
import {Routes,Route,Navigate} from 'react-router-dom'
import DesktopChat from './pages/Chat/DesktopChat';
import Navbar from './components/NavBar/Navbar';
import ProfileCard from './components/ProfileCard/ProfileCard';
import RecentPosts from './pages/RecentPosts/RecentPosts';
import { useEffect, useState } from 'react';
import FollowersCard from './components/FollowersCard/FollowersCard';
import Search from './pages/Search/Search';
import SharedPost from './pages/SharedPost/SharedPost';

function App() {

  const user=useSelector((state)=>state.authReducer.authData)
  const [mobile,setMobile] = useState(false);

  console.log("user in app",user)
  let x=process.env.REACT_APP_BaseUrl1|| "abc"

    // Detect screen size
    useEffect(() => {
      const handleResize = () => {
        setMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
      };
      handleResize(); // Check on initial load
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);  


  return (
    <div className="App">
      {/* <div className='blur' style={{top:'-18%',right:'0'}}></div>
      <div className='blur' style={{top:'36%',left:'-8rem'}}></div> */}

      <Routes>
        <Route path='/' element={mobile&&user?<Navigate to='/mobile/TimeLine' />:user ?<Navigate to="../home"/> :<Navigate to= "/auth" />}/>
        <Route path='/home' element={mobile&&user?<Navigate to="../mobile/TimeLine"/>:user ?<Home/>:<Navigate to="../auth"/>}/>
        <Route path='/auth' element={mobile&&user?<Navigate to="../mobile/TimeLine"/>:user ?<Navigate to="../home"/> :<Auth/>}/>
        <Route path='/profile/:id' element={user? <Profile/>:<Navigate to="../auth"/>}/>
        <Route path='/chat' element = {user? <DesktopChat/>:<Navigate to="../auth"/>}/>
        <Route path='/mobile/profile/:id' element={mobile&&user? <ProfileCard/>:<Navigate to="../auth"/>}/>
          <Route path='/mobile/TimeLine' element={mobile&&user? <RecentPosts/>:<Navigate to="../auth"/>}/>
          <Route path='/mobile/search' element={mobile&&user? <Search/>:<Navigate to="../auth"/>}/>

          {/* //public posts shared bu user */}
          <Route path='/mobile/sharedpost/:id' element={ <SharedPost/>}/>


      </Routes>

    
{mobile && user?       ( <Navbar  /> ):(<></>) }       
    </div>

   
  );
}

export default App;
