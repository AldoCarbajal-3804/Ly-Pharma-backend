import { Router } from "express";
import { ProveedorController } from "../controller/ProveedorController";

export const proveedorRouter = Router();
proveedorRouter.get("/", ProveedorController.list);