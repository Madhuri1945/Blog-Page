import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const secret = process.env.SECRET_KEY;

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });
  const token = jwt.sign({ id: user._id, role: user.role }, secret, {
    expiresIn: "1d",
  });

  res.json({ token, role: user.role });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    es.status(401);
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ id: user._id, role: user.role }, secret, {
    expiresIn: "1d",
  });

  res.json({ token, role: user.role });
};
