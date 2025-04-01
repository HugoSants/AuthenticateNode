import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes.js'
dotenv.config()

const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET

const server = express()

server.use(express.json())
server.use(router)

server.listen(PORT, ()=>{
    console.log("Rodando servidor!")
})