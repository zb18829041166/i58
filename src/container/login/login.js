import React from 'react'
import Logo from '../../component/logo/logo.js'
import {List,InputItem,WhiteSpace,Button,WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect}from 'react-router-dom'


@connect(
    state=>state.user,
    {login}
)

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:''
        }
        this.register=this.register.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
    }
    register(){
        this.props.history.push("/register")
    }

    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }

    handleLogin(){
        this.props.login(this.state)
    }
    render(){
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo/>
                <h2>我是登录页面</h2>
                <WingBlank>
                <List>
                    <InputItem
                        onChange={v=>{this.handleChange('user',v)}}
                    >用户名</InputItem>
                    <InputItem
                        type="password"
                        onChange={v=>{this.handleChange('pwd',v)}}
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


