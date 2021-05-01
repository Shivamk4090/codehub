const mongoose  = require('mongoose')
const userTable = require('./userSchema')


const postSchema = new mongoose.Schema({
    
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:userTable
    }
})


const postTable  = mongoose.model("postTable", postSchema)

module.exports = postTable