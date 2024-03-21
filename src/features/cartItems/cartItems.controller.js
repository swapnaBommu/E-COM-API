import CartItemsModel from "./cartItems.model.js";
export class CartItemsController {
    add(req, res) {
        const { productId, quntity} = req.query;
        console.log('req user id',req.userId);
        const userId = req.userId;
        const error = CartItemsModel.add(productId,userId,quntity);
        if(error){
            res.status(400).send(error);
        }
        res.status(201).send("cart is updated");
    }
    get(req, res) {
        const userId = req.userId;
        const items = CartItemsModel.getAllCartItems(userId);
        res.status(200).send(items);
    }
    deleteItem(req, res){
        const userId = req.userId;
        const id = req.params.id;
        const error = CartItemsModel.delete(id,userId);
        if(error){
            return res.status(404).send(error);
        }
        return res.status(200).send("cart item has removed");
    }
}