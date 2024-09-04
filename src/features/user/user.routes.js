import express from 'express'
import UserController from './user.controller.js'
import jwtAuth from '../../middlewares/jwt.middleware.js'

const userController = new UserController
  
const router = express()

router.post('/signUp', (req, res)=>{
    userController.signUp(req, res)
})

router.post('/logIn', (req, res)=>{
    userController.logIn(req, res)
} )

router.put('/resetPassword', jwtAuth, (req, res, next)=>{
    userController.resetPassword(req, res, next)
})


export default router