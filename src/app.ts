import express from "express"
import cors from "cors"
export const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin:["http://localhost:3000"]
}))
app.get("/",(req,res)=>{
res.send({status:true,message:"Welcome to the server!!"})
})

