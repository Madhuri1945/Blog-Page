import Category from "../models/Category.js";
export const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
};
export const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Category name required" });
  const existingCategory = await Category.findOne({ name });
  if(existingCategory) return res.status(400).json({message:"Category already exist"});
  const category=await Category.create({name});
  res.status(201).json(category);
};
export const updateCategory=async(req,res)=>{
  const {name}=req.body;
  const category=await Category.findByIdAndUpdate(
    req.params.id,
    {name},
    {new:true,runValidators:true}
  );
  if(!category){
    return res.status(404).json({message:"Category not found"});

  }
  res.json(category);
}

export const deleteCategory=async(req,res)=>{
  const category=await Category.findByIdAndDelete(req.params.id);
  if(!category)return res.status(404).json({message:"Category was not found"});
  res.json({message:"Category deleted"});
}