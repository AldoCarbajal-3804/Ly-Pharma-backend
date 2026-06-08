import { Router } from "express"
import { AuthController } from "../controller/AuthController"
import { authenticate } from "../middleware/authenticate"

export const authRouter = Router()

authRouter.post("/", AuthController.login)
authRouter.post("/logout", authenticate, AuthController.logout)
