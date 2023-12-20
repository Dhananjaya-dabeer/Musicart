import connectDB from "./db/index.js";
import dotenv from 'dotenv'
import app from "./app.js"



dotenv.config()

connectDB()
.then(() => {
    app.listen(process.env.PORT || 7000, () => {
        console.log(`server is running at PORT : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGODB connection failed",err)
})