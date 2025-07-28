import Post from "../models/Post.js";
export const getAllPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "all fields are required" });
  }
  const post = await Post.create({ title, content });
  res.json(post);
};
export const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.findByIdAndUpdate(req.params.id, {
    title,
    content,
  });
  if (!post) {
    return res.status(400).json({ message: "Post not found with id" });
  }
  res.json(post);
};
export const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post)
    res
      .status(404)
      .json({ message: `Post not found with id ${req.params.id}` });
  res.json({ message: "Post deleted" });
};
