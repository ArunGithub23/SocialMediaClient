import * as AuthApi from "../Api/AuthRequest"

export const logIn=(formdata)=>async(dispatch)=>{
   
   dispatch({type :'AUTH_START'})
   try {
    const {data}=await AuthApi.logIn(formdata)
    dispatch({type :'AUTH_SUCCESSFUL',data:data})
   } catch (error) {
    console.log(error)
    dispatch({type :'AUTH_FAIL'})
   }
    
}

export const signUp=(formdata)=>async(dispatch)=>{
   //console.log("okk1")
    dispatch({type :'AUTH_START'})
    try {
     // console.log("okk2")
     const {data}=await AuthApi.signUp(formdata)
   //   console.log("okk3",data)
   //   console.log("okk5",typeof(data))
     dispatch({type :'AUTH_SUCCESSFUL', data})
     console.log("okk4")
    } catch (error) {
     console.log(error)
     dispatch({type :'AUTH_FAIL'})
    }
     
 }


//  logout

export const logout=(formdata)=>async(dispatch)=>{
   console.log("okk1")
    try {
      console.log("okk2")

    localStorage.clear('profile')
    localStorage.clear('store')
   

    console.log("okk3")

     dispatch({type :'AUTH_LOGOUT'})
     console.log("okk4")

    }catch(err){
      console.log("error in logout",err);
      
    }
     
 }


 //when user clicks on other user this action should dispatch

 export const UpdateSelectedUser = (status) => ({
  type: "SELECT_USER",
  payload: status,
});


//toggle "showlistof"  state between 'follower and following' 

export const SetShowListOf = (status) => ({
  type: "SHOW_LIST",
  payload: status,
});



//set userid of chat user that is clicked  for chat

export const ChatUserClicked = (status) => ({
  type: "CHAT_USER_CLICKED",
  payload: status,
});


export const FollowButtonClicked = (status) => ({
  type: "FOLLOW_BUTTON_CLICKED",
  payload: status,
});



export const LatestUser=(userid)=>async(dispatch)=>{
   
  dispatch({type :'AUTH_START'})
  try {
   const data=await AuthApi.LatestUser(userid)
   let user=data?.data

   dispatch({type :'LATESTUSER_AUTH_SUCCESSFUL',data:{user,token:''}})
  } catch (error) {
   console.log(error)
   dispatch({type :'AUTH_FAIL'})
  }
   
}