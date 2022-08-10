import * as userRequest from "~/utils/userRequest";

export const post = async(data)=>{
    try {
        const res = await userRequest.post("post/store",data)
        return res;
    } catch (error) {
        console.log(error);
    }
}
export const getTimeline = async(userId)=>{
    try {
        const res = await userRequest.get(`/post/timeline/${userId}`)
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const like = async(data)=>{
    try {
        const res = await userRequest.put('post/like',data)
        return res;
    } catch (error) {
        
    }
}