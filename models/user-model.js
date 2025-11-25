import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim:true
    },
    email: String,
    password: String,
    cart:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"product",
    }
    ],
    order:{ 
        
        type: Array,
        default: []
    },
    contact:Number,
    picture:String
});
    

const UserModel = mongoose.model("user",userSchema);

export default UserModel;