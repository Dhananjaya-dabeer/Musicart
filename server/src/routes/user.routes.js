
import { Router } from "express";
import {  health, register,signin } from "../controllers/user.controllers.js";
import { verifyToken } from "../middleware/jwt.middleware.js";

const router = Router()

router.route("/health").get(health)
router.route("/register").post(register)
router.route("/signin").post(signin)
router.route("/tokenverify").get(verifyToken)





export default router