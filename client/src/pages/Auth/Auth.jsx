import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import {useDispatch,useSelector} from 'react-redux'
import { logIn, signUp } from "../../actions/AuthAction";
//import {Link} from 'react-router-dom'

const Auth = () => {

  const [isSignup,setisSignup]=useState(false)
  const [data,setData]=useState({firstname:"",lastname:"",password:"",confpass:"",username:""})
  const [conpass,setconpass]=useState(false)
  const dispatch=useDispatch()
  const loading=useSelector((state)=>state.authReducer.loading)

  console.log("loading",loading)

  const handlechange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  console.log("data",data)

  const handlesubmit=(e)=>{
    e.preventDefault();
    if(isSignup){
    data.password===data.confpass?dispatch(signUp(data)):setconpass(true);

      }
      else{
        dispatch(logIn(data))
      }

  }


  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Gupta Media</h1>
          <h6>explore the idea</h6>
        </div>
      </div>
{/* login signup feature*/ }
<div className="a-right">
      <form className="infoForm authForm" onSubmit={(e)=>{handlesubmit(e)}}>
        <h3>{isSignup?"Sign up":"Login"}</h3>
        {isSignup &&(<div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
            onChange={handlechange}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
            onChange={handlechange}
          />
        </div>)}
        <div>
          <input
            type="text"
            placeholder="Username"
            className="infoInput"
            name="username"
            onChange={handlechange}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="infoInput"
            name="password"
            onChange={handlechange}
          />
          {isSignup &&(<input
            type="password"
            placeholder="Confirm Password"
            className="infoInput"
            name="confpass"
            onChange={handlechange}
          />)}
        </div>
        <div>   
          <span style={{color:"red", display:conpass?"block":"none"}}>*confirm password not matched</span>   
              <span onClick={()=>setisSignup((x)=>!x)}>{isSignup?"Already have an account? Login ":"Don't have an account? Signup "}</span>
        </div>
        <button className="button infoButton" onClick={()=>{}}>{loading?"loading...":isSignup?"SignUp":"Login"}</button>
      </form>
    </div>
    </div>
  );
};


export default Auth;
