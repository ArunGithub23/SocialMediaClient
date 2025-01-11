import axios from 'axios'

const API=axios.create({baseURL:"https://socialmediaserver-dqlu.onrender.com"})

export const logIn=(formdata)=>API.post('/auth/login',formdata)
export const signUp=(formdata)=>API.post('/auth/register',formdata)
export const LatestUser=(userid)=>API.get(`/user/${userid}`)
