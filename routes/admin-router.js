import express from 'express';
import ProductModel from '../models/product-model.js';
import { loginAdmin, registerAdmin } from '../controllers/auth-controller.js';


const adminRouter = express.Router();

adminRouter.get("/owner",(req,res) =>{
    res.send("Admin Router Working")
})

adminRouter.get("/shop",async (req,res) =>{
    let products = await ProductModel.find({});
    res.json(products)
})

adminRouter.post("/login",loginAdmin)

adminRouter.post("/create", registerAdmin)


export default adminRouter;