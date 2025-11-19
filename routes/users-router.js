import express from 'express';


const usersRouter = express.Router();

usersRouter.get("/",(req,res) =>{
    res.send("user Router Working")
})


export default usersRouter;