
import express from 'express'
import ProductController from './product.controller.js'
import jwtAuth from '../../middlewares/jwt.middleware.js'

const router = express.Router()

const productController = new ProductController()

router.post('/', (req, res)=>{
    productController.addProduct(req, res)
})

router.get('/', (req, res)=>{
    productController.getAllProducts(req, res)
})

router.get('/:id', (req, res)=>{
    productController.getOneProduct(req, res)
})

router.get('/filter', (req, res)=>{
    productController.filterProdcut(req, res)
})

router.post('/rate', jwtAuth, (req, res)=>{
    productController.rateProduct(req, res)
})


export default router