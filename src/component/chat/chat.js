import React from "react"
import {List,InputItem, NavBar,Icon} from "antd-mobile"
import {connect} from "react-redux"
import {getMegList,sendMsg,recvMsg} from "../../redux/chat.redux"
import {getChatId} from "../../utils"


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
        if(!this.props.chat.chatmsg.length){
            this.props.getMegList()
            this.props.recvMsg()
        }
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
        const userid=this.props.match.params.user
        //console.log("1"+user)
        const users=this.props.chat.users
        const Item=List.Item
        if(!users[userid]){
            return null
        }
        const chatid=getChatId(this.props.user._id,this.props.match.params.user)
        const chatmsgs=this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
        return(
            <div id="chat-page">
            <NavBar 
                mode="dark"   
                className="fixed-header"
                icon={<Icon type="left"/>}
                onLeftClick={()=>{
                    this.props.history.goBack()
                }}
            >
             {users[userid].name}
            </NavBar>
            {
                    chatmsgs.map(
                    v=>{
                        const avatar=require(`../img/${users[v.from].avatar}.png`)
                        return v.from==userid?(
                            <List key={v._id}>
                            <Item
                              thumb={avatar}
                            >
                              {v.content}
                              {console.log("2"+v.from)}
                            </Item>
                            </List>
                        ):(
                            <List key={v._id}>
                            <Item 
                                className="chat-me"
                                extra={<img src={avatar} alt=""/>}
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