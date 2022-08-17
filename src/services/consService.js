import * as userRequest from "~/utils/userRequest";

export const create = async(data)=>{
    try {
        const res = await userRequest.post("conversation/create",data);
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const findExits = async(data)=>{
    try {
        const res = await userRequest.post("conversation/findExits",data);
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const findAll = async(data)=>{
    try {
        const res = await userRequest.post("conversation/findAll",data)
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const findOne = async(data)=>{
    try {
        const res = await userRequest.get(`conversation/find/`,{
            params:{
                id: data.consId,
                userId: data.userId
            }
        })
        return res
    } catch (error) {
        console.log(error);
    }
}

export const loadMessage = async(data)=>{
    try {
        const res = await userRequest.post("message/loadMessage",data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const sendMessage = async(data)=>{
    try {
        const res = await userRequest.post("message/store",data)
        return res;
    } catch (error) {
        console.log(error)
    }
}