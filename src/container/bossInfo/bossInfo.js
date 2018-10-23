import React from "react"
import {NavBar,InputItem,TextareaItem,Toast,Button} from "antd-mobile"
import AvatarSelector from "../../component/avatarSselector/avatarSelector"
import {connect} from "react-redux"
import {update} from "../../redux/user.redux"
import {Redirect} from "react-router-dom"

@connect(
    state=>state.user,
    {update}
)

class BossInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:"" ,//职位
            company:"",
            money:"",
            desc:""
        }
    }

    componentDidMount(){
        Toast.hide()
    }
   

    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path=this.props.location.pathname
        const redirect=this.props.redirectTo
        return(
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">Boss完善信息</NavBar>    
                <AvatarSelector
                    selectAvatar={
                        (imgname)=>{
                            this.setState({
                                avatar:imgname
                            })
                        }
                    }
                ></AvatarSelector>
                <InputItem
                    onChange={v=>{this.onChange("title",v)}}
                >
                    招聘职位
                </InputItem>
                <InputItem
                    onChange={v=>{this.onChange("company",v)}}
                >
                    公司名称
                </InputItem>
                <InputItem
                    onChange={v=>{this.onChange("money",v)}}
                >
                    职位薪资
                </InputItem>
                <TextareaItem
                    onChange={v=>{this.onChange("desc",v)}}
                    rows={3}
                    autoHeight
                    title="职位要求"
                >
                </TextareaItem>
                <Button type="primary"
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                >
                    保存
                </Button>
            </div>
        )
    }
}


export default BossInfo