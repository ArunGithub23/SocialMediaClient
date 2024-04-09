
import * as PostApi from '../Api/PostRequest'
export const getTimeLinePosts=(id)=>async(dispatch)=>{
    console.log("check1")

    dispatch({type:"RETREIVING_START"})
    try {
        console.log("in post action")
        const {data}=await PostApi.getTimeLinePosts(id);
        console.log("data in post action",data)
        dispatch({type:"RETREIVING_SUCCESS",data:data})

    } catch (error) {
        console.log("executing catch block of postaction")
        dispatch({type:"RETREIVING_FAIL"})
        console.log(error)
    }
}