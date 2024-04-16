import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name: String,
    description:String,
    price:Number,
    imageUrl:String,
    category:String,
    inStock : Number,
    sizes:{type:String, enum: []}
    
});