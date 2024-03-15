import dotenv from "dotenv";
import app from "./app.js"
dotenv.config({path:'./.env'})
import connectdb from "./database/index1.js";
connectdb()
.then(() =>{
  app.listen(process.env.PORT||8000 ,() =>{
    console.log(`server is running at port:${process.env.port}`);
  })
})
.catch((err)=>{
  console.log(`Mangodb connection failed: ${err}`)
})