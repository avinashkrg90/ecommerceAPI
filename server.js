import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000
import productRouter from './src/features/product/product.routes.js'
import userRouter from './src/features/user/user.routes.js'
import { connectUsingMongoose } from './src/config/mongoose.js'

app.get('/', (req, res)=>{
    res.send("Hello, welcome to the ecommerce API")
})


app.use('/api/product', productRouter)
app.use('/api/user', userRouter)


app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
    connectUsingMongoose()
})