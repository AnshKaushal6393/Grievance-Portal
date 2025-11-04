import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { version } from "mongoose";

dotenv.config();

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to Grievance Portal API",
        version:"1.0.0",
    })
})

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});