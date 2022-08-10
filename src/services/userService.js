import * as userRequest from "~/utils/userRequest";

export const getUser = async(userId)=>{
    try {
        const res = await userRequest.get(`user/${userId}`)
        return res;
    } catch (error) {
        console.log(error);
    }
}