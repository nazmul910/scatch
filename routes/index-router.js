import express from 'express';
import { isLoggedIN } from '../middlewares/islogged-in.js';
import UserModel from '../models/user-model.js';

const indexRouter = express.Router();

indexRouter.get("/",(req,res) =>{
    res.send("Welcome to Home Page")
})

indexRouter.get("/shop",isLoggedIN,(req,res) =>{
    res.send("hellow from shop page")
})

indexRouter.get("/addtocart/:prodId",isLoggedIN, async (req,res) =>{
    const {prodId} = req.params;
    const {email} = req.user;
     let user  = await UserModel.findOne({email:email})
     user.cart.push(prodId);
     await user.save()
        res.status(200).json({  message:"Product added to cart successfully",  user  }) 
})

indexRouter.get("/cart",isLoggedIN, async (req,res) =>{
    const {email} = req.user;
    let user = await UserModel.findOne({email:email}).populate("cart");

    res.status(200).json({  message:"User cart successfully",  cart:user.cart  })   
    
 })


export default indexRouter;