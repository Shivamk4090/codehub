const mongoose  = require('mongoose')

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email : {
        type : String,
        required : true
    }, 
    password : {
        type : String,
        required : true
    }
})

const userTable  = mongoose.model("usersTable", userSchema)

module.exports = userTable;

