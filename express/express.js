const express=require("express")
const app=express()
app.get('/',(req,res)=>{
    res.send("<h1>hello<h1>")
})
app.listen(3031,()=>{
    console.log("监听成功")
})