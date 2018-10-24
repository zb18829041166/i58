import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WhiteSpace,Button,WingBlank,Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {Redirect} from "react-router-dom"
import HandleChange from "../../component/handlechange/handlechange"


@connect(
    state=>state.user, //用户名
    {register}
)


@HandleChange
class Register extends React.Component{
    constructor(props){
        super(props)
        this.handRegister=this.handRegister.bind(this)
    }
    componentDidMount(){
        this.props.handleChange("type","genius")
    }
    handRegister(){
        console.log(this.props.state)
        this.props.register(this.props.state)

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
                      onChange={v=>{this.props.handleChange('user',v)}}
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v=>{this.props.handleChange('pwd',v)}}
                    >密码</InputItem> 
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v=>{this.props.handleChange('repeatpwd',v)}}
                    >确认密码</InputItem> 
                    <WhiteSpace/>
                    <RadioItem checked={this.props.state.type==="genius"}
                        onChange={v=>{this.props.handleChange('type',"genius")}}
                    >
                        牛人
                    </RadioItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.props.state.type==="boss"}
                        onChange={v=>{this.props.handleChange('type',"boss")}}
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