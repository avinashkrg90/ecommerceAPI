import ProductRepository from "./product.repository.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";

const ProductModel = new mongoose.model('Product', productSchema);

export default class ProductController{

    constructor(){
        this.productRepository = new ProductRepository;
    }

    async addProduct(req, res){
        try{
            const {name, description, price, inStock, categories} = req.body;
            const splittedCategories = categories.toString().split(',').map(e=>e.trim());
            const newProduct = new ProductModel({name, description, price, inStock, categories:splittedCategories});
            const result = await this.productRepository.add(newProduct)
            res.status(200).send(result)
        }catch(err){
            throw new Error("product could not be added")
        }     
    }

    async getAllProducts(req, res){
        try{
            const products = await this.productRepository.getAll();
            res.status(200).send(products);
            console.log(products);
        }catch(err){
            cosnole.log(err);
        }
    }

    async getOneProduct(req, res){
        try{
            const id = req.params.id;
            const product = await this.productRepository.get(id);
            if (!product){
                res.status(404).send("product not found")
            }else{
                console.log(product);
                return res.status(200).send(product);
            }
        }catch(err){
            cosnole.log(err);
        }
    }

    filterProdcut(req, res){
        res.send("this is filter product page")
    }

    async rateProduct(req, res){
        try{
            const userId = req.userId;
            const {productId, rating} = req.body;
            console.log(rating)
            await this.productRepository.rateProduct(userId, productId, rating);
            res.status(200).send("rating has been saved")
        }catch(err){
            console.log(err)
        }
    }
}
