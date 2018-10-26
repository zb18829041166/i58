import React from "react"
import {List,InputItem, NavBar} from "antd-mobile"
import {connect} from "react-redux"
import {getMegList,sendMsg,recvMsg} from "../../redux/chat.redux"



@connect(
      state=>state,
    {
      getMegList,
      sendMsg,
      recvMsg
    }
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
       this.props.getMegList()
       this.props.recvMsg()
    }


    handleSubmit(){
        //socket.emit("sendmsg",{text:this.state.text})
        
        const from = this.props.user._id
        const to=this.props.match.params.user
        const msg=this.state.text
        //console.log({from,to,msg})
        //console.log("ffff")
        this.props.sendMsg({from,to,msg})
        this.setState({text:""})
    }
    render(){
        const user=this.props.match.params.user
        //console.log("1"+user)
        const Item=List.Item
        return(
            <div id="chat-page">
            <NavBar mode="dark"   className="fixed-header">
                {user}
            </NavBar>
            {
                this.props.chat.chatmsg.map(
                    v=>{
                      
                        return v.from==user?(
                            <List key={v._id}>
                            <Item>
                              {v.content}
                              {console.log("2"+v.from)}
                            </Item>
                            </List>
                        ):(
                            <List key={v._id}>
                            <Item 
                                className="chat-me"
                                extra={"avatar"}
                            >
                              {console.log("3"+v.from)}
                              {v.content}
                            </Item>
                            </List>
                        )

                    }
                )
            }



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
            </div>
        )
    }
}

export default Chat