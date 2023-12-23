import express, { urlencoded } from 'express'
import cors from 'cors'


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// routes import
import routerHealth from "./routes/user.routes.js"

// rute declaration
app.use("/api/v1/users",routerHealth)

export default app