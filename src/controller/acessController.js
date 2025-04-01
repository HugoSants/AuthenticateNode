import { request, response } from "express";

export class AcessController{
    home(req, res){
        return res.json({message: "Bem vindo"})
    }
}