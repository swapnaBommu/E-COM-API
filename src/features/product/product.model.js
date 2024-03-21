import UserModel from "../user/user.model.js";

export default class ProductModel {
    constructor(id, name, desc,price, imageUrl, category, sizes){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;  
        this.sizes = sizes;
    }
    static getAll(){
      return products;
    }

    static add(product){
      product.id = products.length + 1;
      products.push(product);
      return product;
    }
    static get(id){
      const result = products.find((p) => p.id == id);
      return result;
    }

    static filter(minPrice,maxPrice, category){
      const result = products.filter((product) => {
        return (
          (!minPrice ||
            product.price >= minPrice) &&
          (!maxPrice ||
            product.price <= maxPrice) &&
          (!category ||
            product.category == category)
        );
      });
      return result;
    }
    static rateProduct(userId, productId,rating){
      //1. validate user and product
      const user = UserModel.getAll().find((u) => u.id == userId);
      if(!user){
        return "user not found";
      }

      const product = products.find((p) => p.id == productId);
      if(!product){
        return "product not found";
      }
      //2. check if there are any ratings and if not then add ratings array
      if(!product.ratings){
        product.ratings = [];
        product.ratings.push({userId : userId,rating : rating});
      }else {
        //check if user rating is already available
        
        const existingRatingIndex = product.ratings.findIndex(r => r.userId == userId);
        if(existingRatingIndex >= 0){
          product.ratings[existingRatingIndex] = {userId : userId,rating:rating};
        }else{
          //no existing rating then add rating
          product.ratings.push({userId : userId,rating : rating});
        }
      }

    }
}

let products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Category1'
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Category2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Category3',
      ['M', 'XL','S']
    )];