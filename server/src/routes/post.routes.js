import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/post.controller.js";
import { asyncHandle } from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
const router = Router();
router.get("/", asyncHandle(getAllPosts));
router.get("/:id", validateObjectId("id"), asyncHandle(getPostById));
router.post("/", asyncHandle(createPost));
router.put("/:id", validateObjectId("id"), asyncHandle(updatePost));
router.delete("/:id", validateObjectId("id"), asyncHandle(deletePost));
export default router;
