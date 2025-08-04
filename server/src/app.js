import express from "express";
import postRoutes from "./routes/post.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();
import { errorHandler } from "./middlewares/errorhandler.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
app.use(express.json());
app.use(errorHandler);
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.get("/", (_req, res) => res.send("API is running"));

export default app;
