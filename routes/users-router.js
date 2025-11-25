import express from 'express';
import { loginUser, registerUser ,logout} from '../controllers/auth-controller.js';

const usersRouter = express.Router();

usersRouter.get("/",(req,res) =>{
    res.send("user Router Working")
})


usersRouter.post("/register", registerUser);
usersRouter.post("/login",loginUser)
usersRouter.get("/logout",logout);

export default usersRouter;  