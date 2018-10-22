import axios from "../../node_modules/axios";
import {Toast} from "antd-mobile"
import {getRedirectPath} from '../utils'

const REGISTER_SUCCESS="REGISTER_SUCCESS"
const ERROR_MSG="ERROR_MSG"
const LOGIN_SUCCESS="LOGIN_SUCCESS"

const initState={
    redirectTo:"",
    isAuth:false,
    msg:"",
    user:"",
    pwd:"",
    type:""
}


//reducer
export function user(state=initState,action){
    switch(action.type){
        case REGISTER_SUCCESS:
            return {...state,msg:"",redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOGIN_SUCCESS:
            return {...state,msg:"",redirectTo:getRedirectPath(action.payload)}
        default:
            return state
    }
}

function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}

function registerSuccess(data){
    return {type:REGISTER_SUCCESS,payload:data}
}

function loginSuccess(data){
    return {type:LOGIN_SUCCESS,payload:data}
}

export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg("用户名或密码不能输入为空")
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(loginSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}   




export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('用户名和密码不能为空')
    }
    if(pwd!==repeatpwd){
        return errorMsg('两次输入的密码不一致')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
        .then(
            res=>{
            Toast.hide()
            if(res.status===200&&res.data.code===0){
                dispatch(registerSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
