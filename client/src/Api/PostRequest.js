import axios from 'axios'

const API=axios.create({baseURL:"https://socialmediaserver-dqlu.onrender.com"})

export const getTimeLinePosts=(id)=>API.get(`/post/${id}/timeline`)
export const likePost=(id,userid)=>API.put(`/post/${id}/like`,{userid:userid})