import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res)=>{
    res.send("Hello, welcome to the ecommerce API")
})

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
})