import React from "react"
import io from "socket.io-client"
import {List,InputItem} from "antd-mobile"
import {connect} from "react-redux"
import {getMegList} from "../../redux/chat.redux"


const socket=io("ws://localhost:9093")


@connect(
    state=>state,
    {getMegList}
)



class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:"",
            msg:[]
        }
        this.handleSubmit=this.handleSubmit.bind(this)
        
    }
    componentDidMount(){
        socket.on("recvmsg",(data)=>{
            this.setState({
                msg:[...this.state.msg,data.text]
            })
        })
    }


    handleSubmit(){
        socket.emit("sendmsg",{text:this.state.text})
        this.setState(
            {
                text:""
            }
        )
    }
    render(){
        return(
            <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.text}
                        onChange={
                            v=>{
                                this.setState({text:v})
                            }
                        }
                        extra={<span onClick={this.handleSubmit}>发送</span>}
                    />
                </List>
            </div>
        )
    }
}

export default Chat