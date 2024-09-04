import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { ObjectId } from "mongodb";
import { categorySchema } from "./category.schema.js";

const ProductModel = new mongoose.model('Product', productSchema);
const ReviewModel = new mongoose.model('Review', reviewSchema);
const CategoryModel = new mongoose.model('Category', categorySchema)

export default class ProductRepository{
    async add(newProduct){
        try{
            //1. Add the new product
            const productToAdd = new ProductModel(newProduct);
            const savedProduct = await productToAdd.save();
            console.log(savedProduct)
            //2. Update categories.
            await CategoryModel.updateMany(
                {
                    _id: {$in: newProduct.categories}
                },
                {
                    $push: {products: savedProduct._id}
                }
            )
            return savedProduct
        }catch (err){
            console.log(err)
        }
    }

    async getAll(){
        try{
            const allProdcuts = await ProductModel.find().toArray();
            return allProdcuts;
        }catch (err){
            console.log (err);
        }
    }

    async get(id){
        try{
            const product = await ProductModel.findOne({_id:id});
            return product;
        }catch (err){
            console.log (err);
        }
    }

    // async filter(minPrice, maxPrice, category){
    //     try{
    //         let filterExpression = {};
    //         if (minPrice){
    //             filterExpression.price = {$gte: parseFloat(minPrice)}
    //         }
    //         if (maxPrice){
    //             filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
    //         }
    //         if (category){
    //             filterExpression.category = category
    //         }
    //         const products = await collection.find(filterExpression).toArray();
    //         console.log(products);
    //         return products;
    //     }catch (err){
    //         console.log (err);
    //     }
    // }

    async rateProduct(userId, productId, rating){
        try{
            const productToUpdate = await ProductModel.findById(productId);
            if(!productToUpdate){
                throw new Error("Product not found");
            }
            const userReview = await ReviewModel.findOne({productId:productId, userId:userId})
            if (userReview){
                userReview.rating = rating;
                await userReview.save();
            }else{
                const newReview = new ReviewModel({productId, userId, rating})
                productToUpdate.reviews.push(newReview._id)
                await productToUpdate.save();
                await newReview.save();
                return newReview;
            }
        }catch(err){
            console.log(err);
        }
    }
}