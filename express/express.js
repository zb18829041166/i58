const express=require("express")
const mongoose=require("mongoose")
//链接mongo
const DB_URL='mongodb://127.0.0.1:27017'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',()=>{
    console.log('success')
})


const app=express()
app.get('/',(req,res)=>{
    res.send("<h1>hello<h1>")
})
app.listen(3031,()=>{
    console.log("监听成功") 
})