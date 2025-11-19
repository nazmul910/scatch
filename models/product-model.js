
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image:String,
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

const Product = mongoose.model("product", productSchema);

export default Product;