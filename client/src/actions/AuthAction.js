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