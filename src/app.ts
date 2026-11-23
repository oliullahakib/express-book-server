import express from "express"
import cors from "cors"
import { authRouter } from "./modules/auth/auth.route";
export const app = express()
//build in middleware
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin:["http://localhost:3000"]
}))

//route middleware
app.use("/api/v1/auth",authRouter)

app.get("/",(req,res)=>{
res.send({status:true,message:"Welcome to the server!!"})
})

