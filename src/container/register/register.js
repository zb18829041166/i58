import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WhiteSpace,Button,WingBlank,Radio} from 'antd-mobile'


class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:"",
            pwd:"",
            repeatpwd:"",
            type:"genius"
        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    
    render(){
        const RadioItem=Radio.RadioItem
        return (
            <div>
                <Logo/>
                <h2>我是注册页面</h2>
                <WingBlank>
                <List>
                    <InputItem
                      onChange={v=>{this.handleChange('user',v)}}
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        onChange={v=>{this.handleChange('pwd',v)}}
                    >密码</InputItem> 
                    <WhiteSpace/>
                    <InputItem
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
                    <Button type='primary'>注册</Button>
                </List>
                </WingBlank>
            </div>
        )
    }
}

export default Register