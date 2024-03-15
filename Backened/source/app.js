import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
const app=express()
//app.use for all middleware and config
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    crendentials:true
}))
app.use(express.json({limit:"16kb"}))  
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))//stored the information or file in public folder on my server
app.use(cookieparser())
//import routes
import userroutes from "./routes/userroutes.js"
//we define api so we can use to show that we define api by use "/api/v1/users" instead of "/user"
app.use("/users",userroutes)
export default app