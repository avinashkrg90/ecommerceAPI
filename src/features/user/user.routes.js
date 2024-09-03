import express from 'express'
import UserController from './user.controller.js'

const userController = new UserController

const router = express()

router.post('/signUp', (req, res)=>{
    userController.signUp(req, res)
})

router.post('/logIn', (req, res)=>{
    userController.logIn(req, res)
} )


export default router