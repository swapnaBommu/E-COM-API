//manage the routes of the product

//1. import express
import express from 'express';
import ProductController from './product.controller.js';
import {upload} from '../../middlewares/fileupload.middleware.js';

//2.initialize express router
const productRouter  = express.Router();
const productController = new ProductController;

//All the paths to controller methods

productRouter.post("/rate",productController.rateProduct);
//localhost:4100/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.get("/filter",productController.filterProducts);

productRouter.get("/",productController.getAllProducts);

productRouter.post('/',
                upload.single('imageUrl'),
                productController.addProduct);

                productRouter.get("/:id",productController.getOneProduct);



export default productRouter;