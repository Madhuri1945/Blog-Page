import { Router } from "express";
import {
  addComment,
  createPost,
  getAllPosts,
  getPostById,
  likePost,
  updatePost,
} from "../controllers/post.controller.js";
import { asyncHandle } from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import { verifyToken, isAdmin, optionalAuth } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = Router();
router.get("/", optionalAuth, asyncHandle(getAllPosts));
router.get(
  "/:id",
  validateObjectId("id"),
  verifyToken,
  asyncHandle(getPostById)
);
router.post("/", verifyToken, upload.single("image"), createPost);
router.post("/", verifyToken, isAdmin, asyncHandle(createPost));
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  validateObjectId("id"),
  asyncHandle(updatePost)
);
// router.delete(
//   "/:id",
//   verifyToken,
//   isAdmin,
//   validateObjectId("id"),
//   asyncHandle(deletePost)
// );
router.post(
  "/:id/like",
  validateObjectId("id"),
  verifyToken,
  asyncHandle(likePost)
);
router.post("/comment/:id", verifyToken, addComment);
export default router;
