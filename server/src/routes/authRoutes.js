import express from "express";
import { Router } from "express";
const router = Router();
import { asyncHandle } from "../middlewares/asyncHandler.js";
import { register, login } from "../controllers/authController.js";

router.post("/register", asyncHandle(register));
router.post("/login", asyncHandle(login));
export default router;
