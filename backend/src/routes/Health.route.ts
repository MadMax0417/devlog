import express from "express"
import type { Router } from "express";
import { getHealthStatus } from "../controllers/Health.controller.js";


const router : Router = express.Router();


router.get("/", getHealthStatus)


export default router;