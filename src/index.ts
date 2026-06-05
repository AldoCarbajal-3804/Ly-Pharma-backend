import express from "express"
import { clientesRouter } from "./routes/clientes.routes"
import { productosRouter } from "./routes/products.route"

const app = express()
const port = 3001

app.use(express.json())

app.get("/", (_req, res) =>
{
    res.json({ message: "Hello World" })
})

app.use("/api/clientes", clientesRouter)
app.use("/api/productos", productosRouter)

app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`)
})
