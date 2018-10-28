import React from "react"
import {connect} from "react-redux"
import {List,Badge} from "antd-mobile"


@connect(
    state=>state
)


class  Msg extends React.Component{
    

    getLast(arr){
        return arr[arr.length-1]
    }

    render(){
       const msgGroup={}
       const Item=List.Item
       const Brief=Item.Brief
       const userid=this.props.user._id
       const userInfo = this.props.chat.users
       this.props.chat.chatmsg.forEach(el=> {
           msgGroup[el.chatid]=msgGroup[el.chatid]||[]
           msgGroup[el.chatid].push(el)
       });
       //console.log(msgGroup)
       const chatList=Object.values(msgGroup).sort((a,b)=>{
           //console.log(this.getLast(a).create_time)
           const a_last=this.getLast(a).create_time
           const b_last=this.getLast(b).create_time
           //console.log(this.getLast(b).create_time)
           return b_last-a_last
       })
       console.log(chatList)

       return(
        <div>
          <List>
          {chatList.map(v=>{
                const lastItem=this.getLast(v)
                const targetId=v[0].from===userid?v[0].to:v.from
                const name=userInfo[targetId]?userInfo[targetId].name:null
                const avatar=userInfo[targetId]?userInfo[targetId].avatar:null
                const unreadNum=v.filter(item=>!item.read&&item.to===userid).length
                if (!avatar){
                    return null
                }
                return(
                <Item
                    extra={<Badge text={unreadNum}></Badge>}
                    key={lastItem._id}
                    thumb={require(`../../component/img/${avatar}.png`)}
                    arrow="horizontal"
                    onClick={()=>{this.props.history.push(`/chat/${targetId}`)}}
                >
                  {lastItem.content}
                  <Brief>
                      {name}
                  </Brief>
               </Item>
                )}
            )}
          </List>
        </div>
       )
    }
}

export default Msg