import axios from "axios";

const userRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers:{
        token: "Bearer" + localStorage.getItem("user")?JSON.parse(localStorage.getItem("user"))?.accessToken:"",
    }
})

export const get = async(path,options={})=>{
    const response = await userRequest.get(path,options);
    return response.data
}

export const post = async(path,options={})=>{
    const response = await userRequest.post(path,options);
    return response.data
}

export const put = async(path,options={})=>{
    const response = await userRequest.put(path,options);
    return response.data
}

export default userRequest;