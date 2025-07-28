import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
dotenv.config({ path: "../.env" });

const port = process.env.PORT;

connectDB();
app.listen(port, () => {
  console.log("server is running", port);
});
