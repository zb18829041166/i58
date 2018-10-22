import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WhiteSpace,Button,WingBlank,Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {Redirect}from 'react-router-dom'



@connect(
    state=>state.user, //用户名
    {register}
)

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:"",
            pwd:"",
            repeatpwd:"",
            type:"genius"
        }
        this.handRegister=this.handRegister.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handRegister(){
        this.props.register(this.state)
    }
    
    componentDidUpdate(){
        console.log(this.props.msg)
    }

    render(){
        const RadioItem=Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo/>
                <h2>我是注册页面</h2>
                <WingBlank>
                <List>
                    <InputItem
                      onChange={v=>{this.handleChange('user',v)}}
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v=>{this.handleChange('pwd',v)}}
                    >密码</InputItem> 
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v=>{this.handleChange('repeatpwd',v)}}
                    >确认密码</InputItem> 
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type==="genius"}
                        onChange={v=>{this.handleChange('type',"genius")}}
                    >
                        牛人
                    </RadioItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type==="boss"}
                        onChange={v=>{this.handleChange('type',"boss")}}
                    >
                        Boss
                    </RadioItem>
                    <Button type='primary' onClick={this.handRegister}>注册</Button>
                </List>
                </WingBlank>
            </div>
        )
    }
}

export default Register