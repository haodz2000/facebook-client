import * as httpRequest from "~/utils/httpRequest"
import {
    loginStart,loginSuccess,loginFailure,
    registerStart, registerSuccess, registerFailure,
    logoutStart, logoutSuccess, logoutFailure

}from "~/redux/features/userSlice"

export const register =  async(dispatch,data)=>{
    try{
        dispatch(registerStart())
        const res = await httpRequest.post("auth/register",data)
        console.log(res);
        dispatch(registerSuccess(res.data))
    }catch(err){
        dispatch(registerFailure())
    }
}

export const login = async(dispatch,data)=>{
    try {
        dispatch(loginStart())
        const res = await httpRequest.post("auth/login",data)
        if(res?.data){
            dispatch(loginSuccess(res.data))
        }
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const logout = async(dispatch)=>{
    try {
        dispatch(logoutStart())
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFailure())
    }
}
