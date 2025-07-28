import Category from "../models/Category";
export const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
};
export const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Category name required" });
  const existingCategory = await Category.findOne({ name });
};
