
import express from 'express'
import ProductController from './product.controller.js'

const router = express.Router()

const productController = new ProductController()

router.get('/', (req, res)=>{
    productController.getAllProducts(req, res)
})

router.post('/', (req, res)=>{
    productController.addProduct(req, res)
})

export default router