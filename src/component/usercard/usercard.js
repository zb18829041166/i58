import React from "react"
import {Card,WhiteSpace,WingBlank,Toast} from "antd-mobile"
import {withRouter} from "react-router-dom"

@withRouter
class Usercard extends React.Component{

    handleClick(v){
        this.props.history.push(`/chat/${v.user}`)
    }
    render(){
        const Body=Card.Body
        
        return(
            <WingBlank>
            <WhiteSpace></WhiteSpace>
            {this.props.userlist.map(v=>(
                v.avatar?
                (<Card 
                    key={v._id}
                    onClick={()=>this.handleClick(v)}
                >
                    <Card.Header 
                        title={v.user}
                        thumb={require(`../img/${v.avatar}.png`)}
                        extra={<span>{v.title}</span>}
                    >    
                    </Card.Header>
                    <Body>
                        {v.type==="boss"?<div>公司：{v.company}</div>:null}
                        {v.desc.split("\n").map(item=>(
                            <div key={v._id}>
                              {item}
                            </div>
                        ))}
                        {v.type==="boss"?<div>薪资：{v.money}</div>:null}
                    </Body>
                </Card>):null
            ))}
        </WingBlank>
        )
    }
}

export default Usercard