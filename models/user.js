const mongoose=require('mongoose')
const autiIncrement = require('mongoose-id-autoincrement');
const userSchema=mongoose.Schema({
    id:{
        unique:true,
        type:Number
    },
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  phone:{
    type:String,
    required:true,
  },
})

module.exports=mongoose.model('User',userSchema)

