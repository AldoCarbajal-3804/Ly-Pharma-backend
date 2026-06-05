import express from "express"
import { clientesRouter } from "./routes/clientes.routes"
import { productosRouter } from "./routes/products.route"
import {categoriaRouter} from "./routes/categoria.routes"
import {tiposRouter} from "./routes/tipos.routes"
import {proveedorRouter} from "./routes/proveedor.routes"

const app = express()
const port = 3000

app.use(express.json())

app.get("/", (_req, res) =>
{
    res.json({ message: "Hello World" })
})

app.use("/api/clientes", clientesRouter)
app.use("/api/productos", productosRouter)
app.use("/api/categorias", categoriaRouter)
app.use("/api/tipos", tiposRouter)
app.use("/api/proveedores", proveedorRouter)


app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`)
})
