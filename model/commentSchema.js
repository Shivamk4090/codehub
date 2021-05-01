const mongoose  = require('mongoose')
const postTable = require('./postSchema')
const userTable = require('./userSchema')

const commentSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:userTable
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"postTable"
    }
})

const commentTable = mongoose.model("commentTable", commentSchema)

module.exports = commentTable