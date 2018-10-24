import React from "react"
import Usercard from "../usercard/usercard"
import {connect} from "react-redux"
import {getUserList} from "../../redux/chatuser.redux"

@connect(
    state=>state.chatuser,
    {getUserList}
)


class Genius extends React.Component{
   

    componentDidMount(){
        this.props.getUserList("boss")
    } 

    render(){
        
        return (
            <Usercard userlist={this.props.u}></Usercard>
        )
    }
}

export default Genius