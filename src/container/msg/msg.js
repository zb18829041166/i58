import React from "react"
import {connect} from "react-redux"
import {List} from "antd-mobile"


@connect(
    state=>state
)


class  Msg extends React.Component{
    
    render(){
       const msgGroup={}
       const Item=List.Item
       const Brief=List.Brief
       this.props.chat.chatmsg.forEach(el=> {
           msgGroup[el.chatid]=msgGroup[el.chatid]||[]
           msgGroup[el.chatid].push(el)
       });
       //console.log(msgGroup)
       const chatList=Object.values(msgGroup)
       //const chatList=Object.valu
       return(
        <div>
          <List>
             
          </List>
        </div>
       )
    }
}

export default Msg