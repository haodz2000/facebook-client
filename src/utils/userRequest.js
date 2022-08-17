import axios from "axios";

const userRequest = axios.create({
    baseURL: "https://facebook-api-server.herokuapp.com/api/",
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