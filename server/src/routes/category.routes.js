import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controllers.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import { asyncHandle } from "../middlewares/asyncHandler.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";
const router = Router();
router.get("/", asyncHandle(getCategories));
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  validateObjectId("id"),
  updateCategory
);
router.post("/", verifyToken, isAdmin, asyncHandle(createCategory));
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  validateObjectId("id"),
  deleteCategory
);
export default router;
