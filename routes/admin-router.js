import express from 'express';
import AdminModel from '../models/admin-model.js';


const adminRouter = express.Router();

adminRouter.get("/",(req,res) =>{
    res.send("Admin Router Working")
})


adminRouter.post("/create", async (req,res) =>{
    let admin = AdminModel.find();
    if(admin.length > 0){
        return res.status(400).json({message: "Admin Already Created"}) 
    }

    let {fullname,email,password} = req.body;
    let createAdmin = await AdminModel.create({
        fullname,
        email,
        password
    })
    res.status(201).send(createAdmin);
})


export default adminRouter;