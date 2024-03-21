import { CartItemsController } from "./cartItems.controller.js";
import express from 'express';

const cartRouter = express.Router();
const cartItemController = new CartItemsController();


cartRouter.post("/" , cartItemController.add);
cartRouter.get("/",cartItemController.get);
cartRouter.delete("/:id",cartItemController.deleteItem);

export default cartRouter;