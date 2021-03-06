import React from "react"
import Usercard from "../usercard/usercard"
import {connect} from "react-redux"
import {getUserList} from "../../redux/chatuser.redux"



@connect(
    state=>state.chatuser,
    {getUserList}
)


class Boss extends React.Component{

    componentDidMount(){
        this.props.getUserList("genius")
    } 

    render(){
        return (
                 <Usercard userlist={this.props.userlist}></Usercard>
            )
    }
}

export default Boss