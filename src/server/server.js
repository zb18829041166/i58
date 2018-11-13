const express=require("express")
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
const path=require("path")


const app=express()

const model=require('./model')
const Chat=model.getModel("chat")

const server=require("http").Server(app)
const io=require("socket.io")(server)

//work with express
io.on("connection",(socket)=>{
    socket.on("sendmsg",(data)=>{
        //console.log(data)
        //io.emit("recvmsg",data)
        const {from,to,msg}=data
        const chatid=[from,to].sort().join("_") //两个人之间的消息永远共一个id
        console.log(new Date().getTime())
        Chat.create({chatid,from,to,content:msg},(err,doc)=>{
            //console.log(doc._doc)
            io.emit("recvmsg",Object.assign({},doc._doc))  
        })
    })
})

const userRouter=require('./user')
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use(function(req,res,next){
    if(req.url.startsWith("/user/")||req.url.startsWith("/static/")){
        return next()
    }
    return res.sendFile(path.resolve("build/index.html"))
})

app.use("/",express.static(path.resolve("build")))


server.listen(9093,()=>{
    console.log("监听成功") 
})