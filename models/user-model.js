import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fulname: String,
    email: String,
    password: String,
    cart:{
        type: Array,
        default: []
    },
    isAdmin:Boolean,
    order:{
        type: Array,
        default: []
    },
    contact:Number,
    picture:String
});
    

const UserModel = mongoose.model("user",userSchema);

export default UserModel;