import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import 
import { registerUser } from "./controllers/user.controller.js"
import userRouter from "./routes/user.route.js"


//routes decleration

app.use("/api/v1/users",userRouter)                      //router direct user to /user url and it will call the fuction user router





export {app}