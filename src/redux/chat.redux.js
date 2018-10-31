import axios from "axios"
import io from "socket.io-client"
import {Toast} from "antd-mobile"



const socket=io("ws://localhost:9093") 

const MSG_LIST="MSG_LIST"
const MSG_RECV="MSG_RECV"
//const MSG_READ="MSG_READ"

const initState={
    chatmsg:[],
    unread:0,
    users:[]
}

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,
                    "chatmsg":action.payload.data,
                    "unread":action.payload.data.filter(v=>(!v.read)&&(v.to===action.payload.userid)).length,
                    "users":action.payload.users
                   }
        case MSG_RECV:
            const n=action.payload.to===action.payload.userid?1:0
            return {...state,
                    chatmsg:[...state.chatmsg,action.payload.data],
                    unread:state.unread+n
                   }
       // case MSG_READ:
        default:
            return state
    }
}

function msgList(data,users,userid){
    return {type:MSG_LIST,payload:{data,users,userid}}
}

function msgRecv(data,userid){
    return {type:MSG_RECV,payload:{data,userid}}
}

export function recvMsg(){
    return (dispatch,getState)=>{ 
        socket.on("recvmsg",(data)=>{
            const userid=getState().user._id
            dispatch(msgRecv(data,userid))
        })
     }
}


export function readMsg(){
    return (dispatch,getState)=>{ 
        socket.on("recvmsg",(data)=>{  
            const userid=getState().user._id
            dispatch(msgRecv(data,userid))
        })
     }
}



export function sendMsg({from,to,msg}){
    return dispatch=>{
        socket.emit("sendmsg",{from,to,msg})
    }
}

export function getMegList(){
    /* return (dispatch,getState)=>{
        axios.get("/user/getmsglist")
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                const userid=getState().user._id
                dispatch(msgList(res.data.msgs,res.data.users,userid))
                Toast.hide()
            }
        })
    } */
    return async (dispatch,getState)=>{
        const res=await axios.get("/user/getmsglist")
        if(res.status===200&&res.data.code===0){
            const userid=getState().user._id
            dispatch(msgList(res.data.msgs,res.data.users,userid))
            Toast.hide()
        }
    }
}



