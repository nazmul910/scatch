import ProductModel from "../models/product-model.js";
import cloudinary from "../config/cloudinary-config.js";
import deleteFile from "../utils/delete-file.js";


export const createProduct = async (req, res) => {
  try {

    const {name,price,discount,bgcolor,panelcolor,textcolor} = req.body

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const localPath = req.file.path;  


    const cloudUpload = await cloudinary.uploader.upload(localPath, {
      folder: "products"
    });


    deleteFile(localPath);

    const product = await ProductModel.create({
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      image: {
        url: cloudUpload.secure_url ,
        public_id: cloudUpload.public_id
      } 
    });

    res.status(201).json({
      success:true,
      message: "Product Created Successfully",
      data:product
    });

  } catch (err) {
    console.log("error:", err);
    res.status(500).json({
      success:false,
       message: "error creating product",
       error: err 
      });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json({
      success:true,
      message: "Products fetched successfully",
      data:products
    });
  } catch (err) {
    res.status(500).json({ message: "error fetching products", error: err });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, discount, panelcolor, bgcolor, textcolor } = req.body;

    const existingProduct = await ProductModel.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let updateData = { name, price, discount, bgcolor, panelcolor, textcolor };

    if (req.file) {
      if (existingProduct.image?.public_id) {
        await cloudinary.uploader.destroy(existingProduct.image.public_id);
      }

      const localPath = req.file.path;
      const cloudUpload = await cloudinary.uploader.upload(localPath, { folder: "products" });
      deleteFile(localPath);

      updateData.image = {
        url: cloudUpload.secure_url,
        public_id: cloudUpload.public_id
      };
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    });

  } catch (error) {
    console.log("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error
    });
  }
};

export const updateSingleProductName = async (req,res) =>{
  try {
    const {id} = req.params;
    console.log("id:1 ",id)
    const {name} = req.body

    const existingProduct = await ProductModel.findById(id);
    console.log("ex: ",existingProduct)
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const  updatedName = await ProductModel.findByIdAndUpdate(  id,
      {name},
      {new:true}
   );

   if(!updatedName){
    return res.status(404).json({
      message:"Product not found"
    })
   }else{
    res.status(200).json({
      success:true,
      message:"Product name updated",
      data:updatedName
    });
   }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Error updating name"
    })
  }
}

export const deleteProduct = async (req,res) =>{
  try {
    const {id} = req.params;
  const product = await ProductModel.findById(id);

  if(!product){
    return res.status(404).json({
      message:"Product not found"
    })
  };


  if(product.image?.public_id) {
    await cloudinary.uploader.destroy(product.image.public_id);
  }

  const deletedProd = await ProductModel.findByIdAndDelete(id);

  res.status(200).json({
    success:true,
    message:"Product deleted successfully",
    data:deletedProd,
  })
  } catch (error) {
    console.log("Delete Product error",error);
    res.status(500).json({
      success:false,
      message:"Server error"
    })
  }

}