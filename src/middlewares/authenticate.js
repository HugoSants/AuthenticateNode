import { request, response, next } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../../server.js"

export const tokenAuthenticate = (req, res, next ) => {
    const responseToken = req.header('Authorization')?.split(" ")[1]

    if(!responseToken){ return res.json({error: "Token inválido "}) }

    jwt.verify(responseToken, JWT_SECRET, (error, decoded)=>{
        
        if(error){ return res.json({error}) }

        req.userId = decoded.userId

        next()
    })
}