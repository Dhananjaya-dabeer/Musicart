
import { Router } from "express";
import {  data, health, register,signin, cart } from "../controllers/user.controllers.js";
import { verifyToken } from "../middleware/jwt.middleware.js";

const router = Router()

router.route("/health").get(health)
router.route("/data").get(data)
router.route("/register").post(register)
router.route("/signin").post(signin)
router.route("/tokenverify").get(verifyToken)
router.route("/cart").post(cart)
router.route("/cart").get(cart)




export default router