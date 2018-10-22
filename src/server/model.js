const mongoose=require("mongoose")
//链接mongo
const DB_URL='mongodb://127.0.0.1:27017/i58'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',()=>{
    console.log('success')
})

const models={
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        'avatar':{type:String},
        'desc':{type:String},
        //岗位名字 
        'title':{type:String}, 
        //boss会有自己的公司名字和薪资
        'company':{type:String}, 
        'money':{type:String}, 
    },
    chat:{

    }
}

for (let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports={
    getModel:function(name){
        return mongoose.model(name)
    }
} 