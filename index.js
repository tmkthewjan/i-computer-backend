import express from "express";
import mongoose from "mongoose";
import dns from "dns";
import userRouter from './routers/userRouter.js'
import jwt from "jsonwebtoken";
import { decode } from "punycode";
import authenticate from "./middlewares/authenticate.js";
import productRouter from "./routers/productRouter.js";





dns.setServers(["1.1.1.1", "8.8.8.8"]);
const mongoDBURI="mongodb+srv://admin:1234@cluster0.drm5o6c.mongodb.net/?appName=Cluster0"

mongoose.connect(mongoDBURI).then(()=>{
    console.log("connected to mongoDB");
})

const app = express()

app.use( express.json() )
app.use(authenticate)
    


app.use("/users" , userRouter)
app.use("/products", productRouter)

app.listen(
    3000 ,
    ()=>{
        console.log('Server started successfully')
        console.log('Listening on port 3000')
    }
)