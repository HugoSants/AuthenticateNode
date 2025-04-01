import { Router } from "express";
import { UserController } from "./src/controller/userController.js";
import { LoginController } from "./src/controller/loginController.js";
import { AcessController } from "./src/controller/acessController.js";
export const router = new Router()

const userController = new UserController()
const acessController = new AcessController()
const loginController = new LoginController()

router.post('/cad', userController.create)
router.post('/login', loginController.auth)
router.get('/home', acessController.home)