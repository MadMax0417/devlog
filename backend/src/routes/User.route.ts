import express from "express";
import type { Router } from "express";
import { loginUser, registerUser } from "../controllers/User.controller.js";

const router : Router = express.Router();

//register and login router
router.post("/login", loginUser )
router.post("/register", registerUser )

//protected route



export default router;