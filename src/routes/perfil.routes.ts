import { Router } from "express"
import { PerfilController } from "../controller/PerfilController"
import { authenticate } from "../middleware/authenticate"
import { authorize } from "../middleware/authorize"

export const perfilRouter = Router()

// Públicas (sin auth)
perfilRouter.post("/olvide-password", PerfilController.olvidePassword)
perfilRouter.post("/restablecer-password", PerfilController.restablecerPassword)

// Protegidas (solo el propio usuario autenticado)
perfilRouter.get("/", authenticate, authorize("Admin", "Empleado"), PerfilController.getProfile)
perfilRouter.put("/password", authenticate, authorize("Admin", "Empleado"), PerfilController.changePassword)
perfilRouter.put("/email", authenticate, authorize("Admin", "Empleado"), PerfilController.changeEmail)
perfilRouter.put("/datos", authenticate, authorize("Admin", "Empleado"), PerfilController.updateData)
