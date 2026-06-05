import { Router } from "express";
import { ProductoController } from "../controller/ProductoController";

export const productosRouter = Router();

productosRouter.get("/", ProductoController.list);
productosRouter.post("/", ProductoController.create);
productosRouter.delete("/:id_producto", ProductoController.delete);
productosRouter.put("/:id_producto", ProductoController.update);