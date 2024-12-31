import axios from 'axios'

const BaseUrl = process.env.REACT_APP_BaseUrl1;

const API=axios.create({baseURL:BaseUrl})

export const uploadImage=(data)=>API.post('/upload',data)

export const uploadPost=(data)=>API.post('/post',data,{ headers: {
    "Content-Type": "multipart/form-data", // Ensure the correct content type is set
}}
)

