import express from "express"
import type { Request, Response, NextFunction } from "express"
import { clientesRouter } from "./routes/clientes.routes"
import { productosRouter } from "./routes/products.route"
import { categoriaRouter } from "./routes/categoria.routes"
import { tiposRouter } from "./routes/tipos.routes"
import { proveedorRouter } from "./routes/proveedor.routes"
import { authRouter } from "./routes/auth.routes"

const app = express()
const port = 3000

app.use(express.json())

app.get("/", (_req, res) => {
  res.json({ message: "Hello World" })
})

app.use("/api/auth", authRouter)
app.use("/api/clientes", clientesRouter)
app.use("/api/productos", productosRouter)
app.use("/api/categorias", categoriaRouter)
app.use("/api/tipos", tiposRouter)
app.use("/api/proveedores", proveedorRouter)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", err.message)
  res.status(500).json({ message: "Error interno del servidor" })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
