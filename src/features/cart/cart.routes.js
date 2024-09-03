
import express from "express"
import CartItemsController from "./cart.controller.js"

const router = express.Router()

const cartItemsController = new CartItemsController

router.get('/', (req, res)=>{
    cartItemsController.get(req, res);
})

router.post('/', (req, res)=>{
    cartItemsController.add(req, res);
})

router.delete('/', (req, res)=>{
    cartItemsController.delete(req, res);
})

export default router