import express, { Router } from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js"; 
import { getAllLogs, getSingleLog, createLog, deleteLog, updateLog } from "../controllers/Log.controller.js";


const router : Router = express.Router();


//Protected logs
router.get("/", isLoggedIn, getAllLogs ) //get all logs
router.get("/:id", isLoggedIn, getSingleLog ) //get single log
router.post("/", isLoggedIn, createLog ) //create new log
router.put("/:id", isLoggedIn, updateLog ) //edit a log
router.delete("/:id", isLoggedIn, deleteLog ) //delete a log


export default router

