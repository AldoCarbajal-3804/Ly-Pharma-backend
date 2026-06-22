import express from "express"
import type { Request, Response, NextFunction } from "express"
import cors from "cors"
import { env } from "./config/env"
import { clientesRouter } from "./routes/clientes.routes"
import { productosRouter } from "./routes/products/products.route"
import { categoriaRouter } from "./routes/products/categoria.routes"
import { tiposRouter } from "./routes/products/tipos.routes"
import { proveedorRouter } from "./routes/products/proveedor.routes"
import { authRouter } from "./routes/users/auth.routes"
import { ventasRouter } from "./routes/ventas.routes"
import { perfilRouter } from "./routes/users/perfil.routes"
import { muestraRouter } from "./routes/dashboard/muestra.routes"
import { sesionesRouter } from "./routes/users/sesiones.routes"
import { handleValidationError } from "./middleware/handleValidationError"

const app = express()
const { PORT, CORS_ORIGINS, API_PREFIX } = env

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || CORS_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error("Origen no permitido"))
  }
}))

app.use(express.json())

app.get("/", (_req, res) => {
  res.json({ message: "Hello World" })
})

app.use(`${API_PREFIX}/auth`, authRouter)
app.use(`${API_PREFIX}/clientes`, clientesRouter)
app.use(`${API_PREFIX}/productos`, productosRouter)
app.use(`${API_PREFIX}/categorias`, categoriaRouter)
app.use(`${API_PREFIX}/tipos`, tiposRouter)
app.use(`${API_PREFIX}/proveedores`, proveedorRouter)
app.use(`${API_PREFIX}/ventas`, ventasRouter)
app.use(`${API_PREFIX}/perfil`, perfilRouter)
app.use(`${API_PREFIX}/muestra`, muestraRouter)
app.use(`${API_PREFIX}/sesiones`, sesionesRouter)

app.use(handleValidationError)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", err.message)
  res.status(500).json({ message: "Error interno del servidor" })
})

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

export default app
