import jwt from 'jsonwebtoken';

import UserModel from '../models/user-model.js';

export const isLoggedIN = async (req,res,next) =>{
    if(!req.cookies?.token){
        req.flash("error","You are not logged in");
        return res.status(401).redirect("/login");
    }

    try {
        let decode = jwt.verify(req.cookies.token,process.env.JWT_KEY);

        let user = await UserModel.findOne({email:decode?.email}).select("-password");

        req.user = user;
        next();
        
    } catch (error) {
        req.flash("error","something went wrong");
        res.redirect("/login");
    }
}