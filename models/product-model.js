
import mongoose from "mongoose";
import { type } from "os";

const productSchema = new mongoose.Schema({
    image:{
        url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        }
    },
    name:String,
    price: Number,
    discount:{
        type:Number,
        default: 0
    },
    bgcolor: String,
    panelcolor:String,
    textcolor : String,
});

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;  