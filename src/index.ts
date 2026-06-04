import express from "express"
import { clientesRouter } from "./routes/clientes.routes"

const app = express()
const port = 3000

app.use(express.json())

app.get("/", (_req, res) =>
{
    res.json({ message: "Hello World" })
})

app.use("/api/clientes", clientesRouter)

app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`)
})
