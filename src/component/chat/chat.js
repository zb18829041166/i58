import React from "react"
import {List,InputItem, NavBar,Icon,Grid} from "antd-mobile"
import {connect} from "react-redux"
import {getMegList,sendMsg,recvMsg,readMsg} from "../../redux/chat.redux"
import {getChatId} from "../../utils"
import { isNull } from "util";
import QueueAnim from "rc-queue-anim"

@connect(
    state=>state,
    { 
      getMegList,
      sendMsg,
      recvMsg,
      readMsg
    }
)



class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:"",
            msg:[],
            showEmoji:false
        }
        this.handleSubmit=this.handleSubmit.bind(this)
        
    }
    
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMegList()
            this.props.recvMsg()
        }
        const to=this.props.match.params.user
        this.props.readMsg()   
        setTimeout(()=>{
           // window.dispatchEvent(new Event("resize"))
        },0)
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
        const emoji="😃 😂 😭 🐻 🍔" .split(" ").filter(v=>v).map(v=>(
            {
              text:v
            }
        ))
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
            <QueueAnim delay={100}>
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
            </QueueAnim>


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
                        extra={
                            <div>
                                 <span
                                    onClick={()=>{
                                        this.setState({
                                            showEmoji:!this.state.showEmoji
                                        })
                                    }}
                                    style={{marginRight:15}}
                                 >😭</span>
                                 <span onClick={this.handleSubmit}>发送</span>
                            </div>
                            }
                    />
                </List>
                {
                   this.state.showEmoji?
                     (<Grid
                     data={emoji}
                     columnNum={9}
                     carouselMaxRow={4}
                     isCarousel={true} 
                     onClick={
                         el=>{
                             this.setState({
                                text:this.state.text+el.text
                             })
                         }
                     }
                />):null
                }
            </div>
            </div>
        )
    }
}

export default Chat