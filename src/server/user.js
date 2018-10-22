const express=require('express')
const utils=require('utility')
const Router=express.Router()
const model=require('./model')
const User=model.getModel('user')




Router.get('/list',(req,res)=>{
    //User.remove({},(err,doc)=>{})
    User.find({},(err,doc)=>{
        return res.json(doc)
    })
})

Router.post("/login",(req,res)=>{
    const {user,pwd}=req.body
    User.findOne({user,pwd:md5Pwd(pwd)},{pwd:0},(err,doc)=>{
        if(!doc){
            console.log('1111')
            return res.json({code:1,msg:"用户名或密码错误"})
        }else{
            return res.json({code:0,data:doc})
        }
    })
})







Router.post("/register",(req,res)=>{
    const {user,pwd,type}=req.body
    User.findOne({user},(err,doc)=>{
        if(doc){
            return res.json({code:1,msg:"用户名重复"})
        }
        User.create({user,pwd:md5Pwd(pwd),type},(err,doc)=>{
            if(err){
                return res.json({code:1,msg:"后端出错了"})
            }
            return res.json({code:0})
        })
    })
})



Router.get('/info',(req,res)=>{
    return res.json({code:1})
})

function md5Pwd(pwd){
    const salt='zbbsjkfdsjfklajlfjsiaf'
    return utils.md5(utils.md5(pwd+salt))
}



module.exports=Router