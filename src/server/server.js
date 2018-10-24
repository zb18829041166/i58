const express=require("express")
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")

const app=express()


const server=require("http").Server(app)
const io=require("socket.io")(server)

//work with express
io.on("connection",(socket)=>{
    socket.on("sendmsg",(data)=>{
        console.log(data)
        io.emit("recvmsg",data)
    })
})

const userRouter=require('./user')



app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

app.get('/',(req,res)=>{
    res.send("<h1>hello<h1>")
})
server.listen(9093,()=>{
    console.log("监听成功") 
})