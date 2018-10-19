import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WhiteSpace,Button,WingBlank,Radio} from 'antd-mobile'


class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            "type":"genius"
        }
    }
    
    render(){
        const RadioItem=Radio.RadioItem
        return (
            <div>
                <Logo/>
                <h2>我是注册页面</h2>
                <WingBlank>
                <List>
                    <InputItem>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem>密码</InputItem> 
                    <WhiteSpace/>
                    <InputItem>确认密码</InputItem> 
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type==="genius"}>
                        牛人
                    </RadioItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type==="boss"}>
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