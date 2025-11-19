import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    fullname: {
        type:String,
        minLength:3,
        trim:true
    },
    email:String,
    password: String,
    products:{
        type: Array,
        default: []
    },
    picture: String,

})


const AdminModel = mongoose.model("admins",adminSchema);

export default AdminModel;