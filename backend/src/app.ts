import express from "express";
import type { Express, NextFunction, Response, Request } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app: Express = express();

dotenv.config({
  path: "./.env",
});

//TO-DO: add cors here

app.use(express.json({ limit: "50kb" }));
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
