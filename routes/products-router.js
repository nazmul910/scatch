import express from 'express';


const productsRouter = express.Router();

productsRouter.get("/",(req,res) =>{
    res.send("product Router Working")
})


export default productsRouter;