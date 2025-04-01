import { request, response } from "express";
import bcrypt from 'bcryptjs'
import { prisma } from "../util/prisma.js";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../../server.js";

export class LoginController{
    async auth(req, res){
        const { email, senha } = req.body

        const emalExist = await prisma.user.findUnique({where:{email}})

        if(!emalExist){ return res.status(401).json({error: "Email não encontrado! "})}

        const senhaCrypto = await bcrypt.compare(senha, emalExist.senha)

        if(!senhaCrypto){
            res.status(401).json({error: "Senha incorreta! "})
        }
        const id_user = emalExist.id

        const token = jwt.sign({id_user}, JWT_SECRET, {expiresIn: '1h'})

        console.log("Logado com sucesso! ")
        return res.json({token})
        
    }
}