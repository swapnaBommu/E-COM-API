import UserModel from "../user/user.model.js";
import ProductModel from "../product/product.model.js";

export default class CartItemsModel {
    constructor(productId,userId,quantity,id){
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this.id = id;
    }
    static add(productId,userId,quantity){
        const product = ProductModel.getAll().find(p => p.id == productId);
        if(!product){
            return "Product not found";
        }
        const user = UserModel.getAll().find( u=> u.id == userId);
        if(!user){
            return "user not found";
        }
        const cartItem = new CartItemsModel(productId,userId,quantity);
        cartItem.id = cartItems.length+1;
        cartItems.push(cartItem);
    }
    
    static getAllCartItems(userId){

        const allItems = cartItems.filter(c => c.userId == userId);
        return allItems;  
    }

    static delete(cartItemId,userId){

        const index = cartItems.findIndex( c => c.id == cartItemId && c.userId == userId);
        if(index == -1){
            return "Item not found";
        }else{
            cartItems.splice(index,1);
        }
    }

}
let cartItems = [ 
    new CartItemsModel(1,2,1,1),
    new CartItemsModel(1,1,3,1)
];