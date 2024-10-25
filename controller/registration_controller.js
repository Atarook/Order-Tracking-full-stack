const app=require('express')
const user=require('../models/user')


const CreateUser=async(req,res)=>{
    try{
        const {name,password,email,phone}=req.body
        const users=await user.findOne({ $or: [{ name }, { email }] } )
        if (users) {
            console.log('User already exists:', existingUser);
            return res.status(400).json({ msg: 'User already exists' });
        }

        const newUser = await user.create(req.body);
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(400).json({msg:error})
        console.log(error)
    }

}
module.exports={CreateUser}