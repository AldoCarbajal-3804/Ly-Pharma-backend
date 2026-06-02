import express, { Request, Response } from "express"

const app = express()
const port = 3000

app.use(express.json())

app.get("/", (_req: Request, res: Response) =>
{
    res.json({ message: "Hello World" })
})


app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`)
})
