const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
        
    },
    img:{
        type:String        
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
        
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
})

const postProps = ['content','user']

module.exports = {
    Post:mongoose.model('post',postSchema),
    postProps
}