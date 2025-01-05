
import './App.css';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import Home from './pages/home/home';
import Chat from './components/Chat/chat';
import {useSelector} from 'react-redux'
import {Routes,Route,Navigate} from 'react-router-dom'
import DesktopChat from './pages/Chat/DesktopChat';

function App() {

  const user=useSelector((state)=>state.authReducer.authData)
  console.log("user in app",user)
  let x=process.env.REACT_APP_BaseUrl1|| "abc"
  return (
    <div className="App">
      {/* <div className='blur' style={{top:'-18%',right:'0'}}></div>
      <div className='blur' style={{top:'36%',left:'-8rem'}}></div> */}

      <Routes>
        <Route path='/' element={user?<Navigate to='/home' />:<Navigate to= "/auth" />}/>
        <Route path='/home' element={user?<Home/>:<Navigate to="../auth"/>}/>
        <Route path='/auth' element={user?<Navigate to="../home"/>:<Auth/>}/>
        <Route path='/profile/:id' element={user? <Profile/>:<Navigate to="../auth"/>}/>
        <Route path='/chat' element = {user? <DesktopChat/>:<Navigate to="../auth"/>}/>
      </Routes>

    </div>
  );
}

export default App;
