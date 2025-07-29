import dotenv from "dotenv";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
dotenv.config();

const port = process.env.PORT;

connectDB();
app.listen(port, () => {
  console.log("server is running", port);
});
