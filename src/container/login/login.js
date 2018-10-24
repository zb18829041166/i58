import React from 'react'
import Logo from '../../component/logo/logo.js'
import {List,InputItem,WhiteSpace,Button,WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect}from 'react-router-dom'
import HandleChange from "../../component/handlechange/handlechange"

@connect(
    state=>state.user,
    {login}
)

@HandleChange
class Login extends React.Component{
    constructor(props){
        super(props)
        this.register=this.register.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
    }
    register(){
        this.props.history.push("/register")
    }
    handleLogin(){
        this.props.login(this.props.state)
    }
    render(){
        return (
            <div>
                {this.props.redirectTo&&this.props.redirectTo!=="/login"?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo/>
                <h2>我是登录页面</h2>
                <WingBlank>
                <List>
                    <InputItem
                        onChange={v=>{this.props.handleChange('user',v)}}
                    >用户名</InputItem>
                    <InputItem
                        type="password"
                        onChange={v=>{this.props.handleChange('pwd',v)}}
                    >密码</InputItem> 
                </List>
                <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login


