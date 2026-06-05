import {Router} from "express"
import { CategoriaController } from "../controller/CategoriaController"

export const categoriaRouter = Router()
categoriaRouter.get("/", CategoriaController.list)
