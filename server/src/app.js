import express, { urlencoded } from 'express'
import cors from 'cors'


const app = express()
app.use(cors())
app.use(express.json({limit : '5mb'}))
app.use(express.urlencoded({extended: true, limit : '5mb'}))


// routes import
import routerHealth from "./routes/user.routes.js"

// rute declaration
app.use("api/v1/users",routerHealth)

export default app