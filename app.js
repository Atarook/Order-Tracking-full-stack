require('dotenv').config()
const autiIncrement = require('mongoose-id-autoincrement');

const userRoute=require('./routes/user_route')
const connectDB=require('./connection/connection')
const express=require('express');
const { default: mongoose } = require('mongoose');
const app=express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Home page')
})
app.use('/',userRoute)
const port=8000  
    const start=async()=>{
        try{
    connectDB(process.env.MONGO_URI)
    app.listen(port,()=>{
    console.log('listening on port 8000....')
    })
    }
    catch(error){
        console.log(error)
    }
}
start()

