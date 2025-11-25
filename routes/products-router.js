import express from 'express';
import upload from '../config/multer-config.js';

import { createProduct, deleteProduct, getAllProducts, updateProducts, updateSingleProductName } from '../controllers/products-controller.js';

const productsRouter = express.Router();



productsRouter.post("/create",upload.single("image"),createProduct);

productsRouter.get("/allProducts",getAllProducts)

productsRouter.put("/update/:id",upload.single("image"),updateProducts);

productsRouter.patch("/update-name/:id",updateSingleProductName);

productsRouter.delete("/delete/:id",deleteProduct);

export default productsRouter;