import express from "express";
import postRoutes from "./routes/post.routes.js";
import categoryRoutes from './routes/category.routes.js'
const app = express();
import { errorHandler } from "./middlewares/errorhandler.js";
app.use(express.json());
app.use(errorHandler);
app.use("/api/posts", postRoutes);
app.use("/api/categories",categoryRoutes)
app.get("/", (_req, res) => res.send("API is running"));

export default app;
