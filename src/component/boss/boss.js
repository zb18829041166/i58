import React from "react"
import {Card,WhiteSpace,WingBlank,Toast} from "antd-mobile"
import {connect} from "react-redux"
import {getUserList} from "../../redux/chatuser.redux"

@connect(
    state=>state.chatuser,
    {getUserList}
)


class Boss extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    

    componentDidMount(){
        this.props.getUserList("genius")
    }

    render(){
        const Body=Card.Body
        return ( 
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v=>(
                    v.avatar?
                    (<Card key={v._id}>
                        <Card.Header 
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        >    
                        </Card.Header>
                        <Body>
                            {v.desc.split("\n").map(item=>(
                                <div key={v._id}>
                                  {item}11
                                </div>
                            ))}
                        </Body>
                    </Card>):null
                ))}
            </WingBlank>
        )
    }
}

export default Boss