
import * as UploadApi from '../Api/UploadRequest'
export const uploadImage=(data)=>async(dispatch)=>{
    try {
        await UploadApi.uploadImage(data)
    } catch (error) {
        console.log(error)
    }
}

export const uploadPost=(data)=>async(dispatch)=>{
    
    dispatch({type:'UPLOAD_STARTS'})
    try {
        console.log("data in uploadaction",data)
        const newPost=await UploadApi.uploadPost(data)

        dispatch({type:'UPLOAD_SUCCESFUL',data:newPost})
    
    } catch (error) {
        dispatch({type:'UPLOAD_FAIL'})
        console.log(error)
    }
}