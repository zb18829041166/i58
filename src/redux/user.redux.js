import axios from "../../node_modules/axios";
import {Toast} from "antd-mobile"
import {getRedirectPath} from '../utils'
import { userInfo } from "os";




const ERROR_MSG="ERROR_MSG"
const AUTH_SUCCESS="AUTH_SUCCESS"
const LOAD_DATA="LOAD_DATA"



const initState={
    redirectTo:"",
    msg:"",
    user:"",
    type:""
}


//reducer
export function user(state=initState,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state,msg:"",redirectTo:getRedirectPath(action.payload),...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOAD_DATA:
            return {...state,...action.payload}
        default:
            return state
    }
}

function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}

function authSuccess(obj){
    const {pwd,...data}=obj //过滤pwd字段 
    return {type:AUTH_SUCCESS,payload:data}
}



export function update(data){
    return dispatch=>{
        axios.post("/user/update",data)
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}



export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg("用户名或密码不能输入为空")
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}   

export function loadData(){
    return {type:LOAD_DATA,payload:userInfo}
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
                dispatch(authSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
