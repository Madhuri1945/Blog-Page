import express from "express";
import upload from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  favoriteBlogs,
  getFavoriteBlogs,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import { Router } from "express";

import validateObjectId from "../middlewares/validateObjectId.js";
const router = Router();
router.put(
  "/updateProfile",
  verifyToken,
  upload.single("profileImage"),
  updateProfile
);
router.get("/profile", verifyToken, getProfile);
router.post("/favorites/:id", verifyToken, favoriteBlogs);
router.get("/favorites", verifyToken, getFavoriteBlogs);
export default router;
