import express from "express";
import type { Router } from "express";
import { loginUser, logOutUser, registerUser } from "../controllers/User.controller.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const router : Router = express.Router();

//register and login router
router.post("/login", loginUser )
router.post("/register", registerUser )

//protected route
router.post("/logout", isLoggedIn, logOutUser)


export default router;