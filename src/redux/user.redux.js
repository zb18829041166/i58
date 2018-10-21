import axios from "../../node_modules/axios";

const REGISTER_SUCCESS="REGISTER_SUCCESS"
const ERROR_MSG="ERROR_MSG"

const initState={
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
            return {...state,msg:"",isAuth:true,...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
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




export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('用户名和密码不能为空')
    }
    if(pwd!==repeatpwd){
        return errorMsg('两次输入的密码不一致')
    }
    return dispatch=>{
        axios.post('./user/register',{user,pwd,type})
        .then(res=>{
            if(res.status===200&&res.date.code===0){
                dispatch(registerSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
