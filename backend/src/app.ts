import express from "express";
import type { Express, NextFunction, Response, Request } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();

dotenv.config({
  path: "./.env",
});

//TO-DO: add cors here
const allowedOrigins = [ process.env.DEV_URL!, process.env.PROD_URL!]

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-type", "Authorization"]
}))

//TO_DO:future update add limiter here 

app.use(express.json({ limit: "50kb" }));

app.use(express.urlencoded({
  extended: true,
  limit: "50kb"
}))

app.use(cookieParser());

//routes
import userRoute from "./routes/User.route.js";
import healthRoute from "./routes/Health.route.js";
import logRoute from "./routes/Log.route.js";

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/log", logRoute);
app.use("/api/v1/health", healthRoute);

//TO-DO : add global error handling
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack)
    
  
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong"
  })
});

export default app;
