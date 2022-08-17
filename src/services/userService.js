import { async } from "@firebase/util";
import userRequest from "~/utils/userRequest";

export const getUser = async(userId)=>{
    try {
        const res = await userRequest.get(`user/${userId}`)
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = async()=>{
    try {
        const res = await userRequest.get('user/getUsers')
        return res;
    } catch (error) {   
        console.log(error);
    }
}

export const follow = async(data)=>{
    try {
        const res = await userRequest.post('user/follow',data)
        return res
    } catch (error) {
        console.log(error);
    }
}

export const getOnlineUsers = async(data)=>{
    try {
        const res = await userRequest.post('user/getOnlineUser',data)
        return res
    } catch (error) {
        console.log(error);
    }
}