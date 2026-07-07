import express from "express";
import mongoose from "mongoose";
import dns from "dns";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import authenticate from "./middlewares/authenticate.js";

dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(cors());
app.use(express.json());

// Public Routes
app.use("/users", userRouter);

// Protected Routes
app.use(authenticate);
app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("Server started successfully");
  console.log("Listening on port 3000");
});