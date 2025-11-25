import UserModel from '../models/user-model.js';
import AdminModel from '../models/admin-model.js';
import bcrypt from "bcrypt"
import generateToken from '../utils/genarate-token.js';

 export const registerUser =async (req,res) =>{
    try {

        let {email,password,fullname} = req.body;
 

        let exitingUser = await UserModel.findOne({email})


        if(exitingUser){
            return res.status(400).send("User already exists");
        }else{
            bcrypt.genSalt(10, (err,salt) =>{
            bcrypt.hash(password,salt, async (err,hashPassword) =>{
                if(err){
                    return res.status(500).send(err.message)
                }else{
                    
                 let user = await UserModel.create({
                     email,
                     password: hashPassword,
                     fullname
                    })

                  let token =  generateToken(user) 
                  res.cookie("token",token,);

                 res.status(201).send("user registered successfully");

                }
            })
         })
        }

         
    
    } catch (error) {
        console.log("Error in User Registration:", error);
        res.status(500).send({message: "Internal Server Error"})
    }
} 


export const loginUser = async(req,res) =>{
    const {email,password} = req.body;

    const user =  await UserModel.findOne({email:email});
    if(!user){
        return res.status(400).send("Email or Password is incorrect 1");
    } 

    bcrypt.compare(password,user.password,(err,result) =>{
        console.log("bcrypt compare result:", result);
        if(result){
            let token = generateToken(user);
            res.cookie("token",token);
            res.status(200).send("Login Successful");
        }
        else{
            return res.status(400).send("Email or Password is incorrect2");
        }
    })
     
}


 export const registerAdmin =async (req,res) =>{
    try {

        let {email,password,fullname} = req.body;
 

        let exitingUser = await AdminModel.find()


        if(exitingUser.length> 0){
            return res.status(400).send("Admin already exists");
        }else{
            bcrypt.genSalt(10, (err,salt) =>{
            bcrypt.hash(password,salt, async (err,hashPassword) =>{
                if(err){
                    return res.status(500).send(err.message)
                }else{
                    
                 let user = await AdminModel.create({
                     email,
                     password: hashPassword,
                     fullname
                    })

                  let token =  generateToken(user) 
                  res.cookie("token",token,);

                 res.status(201).send("Admin registered successfully");

                }
            })
         })
        }

         
    
    } catch (error) {
        console.log("Error in Admin Registration:", error);
        res.status(500).send({message: "Internal Server Error"})
    }
} 


export const loginAdmin = async(req,res) =>{
    const {email,password} = req.body;

    const user =  await AdminModel.findOne({email:email});
    console.log("user1",user)
    if(!user){
        return res.status(400).send("Email or Password is incorrect 1");
    } 

    bcrypt.compare(password,user.password,(err,result) =>{
        console.log("bcrypt compare result:", result);
        if(result){
            let token = generateToken(user);
            res.cookie("token",token);
            res.status(200).send("Login Successful");
        }
        else{
            return res.status(400).send("Email or Password is incorrect2");
        }
    })
     
}


export const logout = (req,res) =>{
    res.cookie("token","");
    res.redirect("/");
}

