const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
        
    },
    age:{
        type:Number,
        required:true
        
    },
    password:{
        type:String,
        required:true
        
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
        
    },
    posts:[{
        type:Schema.Types.ObjectId,
        ref:'post'
    }]
})

const userProps = ['username','age','password','name']

module.exports = {
    User:mongoose.model('users',userSchema),
    userProps
}