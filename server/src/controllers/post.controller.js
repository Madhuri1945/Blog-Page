import Post from "../models/Post.js";
export const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("category", "name")
    .populate("likes", "username")
    .populate("comments", "username")
    .sort({ createdAt: -1 });
  const formattedPosts = posts.map((post) => ({
    _id: post._id,
    title: post.title,
    content: post.content,
    category: post.category?.name || null,
    imageUrl: post.image
      ? `${req.protocol}://${req.get("host")}/uploads/${post.image}`
      : null,
    likesCount: post.likes.length,
    likedBy: post.likes.map((user) => user.username),
    comments: post.comments.map((comment) => ({
      username: comment.username,
      text: comment.text,
      createdAt: comment.createdAt,
    })),
  }));
  res.json(formattedPosts);
};

export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("category", "name")
    .populate("likes", "username")
    .populate("comments", "username")
    .sort({ createdAt: -1 });
  const formattedPost = {
    _id: post._id,
    title: post.title,
    content: post.content,
    category: post.category?.name || null,
    imageUrl: post.image
      ? `${req.protocol}://${req.get("host")}/uploads/${post.image}`
      : null,
    likesCount: post.likes.length,
    likedBy: post.likes.map((user) => user.username),
    comments: post.comments.map((comment) => ({
      username: comment.username,
      text: comment.text,
      createdAt: comment.createdAt,
    })),
  };
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(formattedPost);
};
export const createPost = async (req, res) => {
  const { title, content, category } = req.body;
  const imagePath = req.file ? req.file.filename : null;
  if (!title || !content) {
    return res.status(400).json({ message: "all fields are required" });
  }
  const post = await Post.create({
    title,
    content,
    category,
    image: imagePath,
  });
  res.json(post);
};
export const updatePost = async (req, res) => {
  const { title, content, category } = req.body;
  const post = await Post.findByIdAndUpdate(req.params.id, {
    title,
    content,
    category,
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
export const likePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  console.log(userId);
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: "Post not found" });
  const liked = post.likes.includes(userId);
  if (liked) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }
  await post.save();
  res.status(200).json({
    message: liked ? "Post unliked" : "Post liked",
    likesCount: post.likes.length,
  });
};
export const addComment = async (req, res) => {
  const postId = req.params.id;
  const { text } = req.body;
  const userId = req.user.id;

  if (!text || !text.trim()) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      user: userId,
      text,
      createdAt: new Date(),
    });

    await post.save();

    res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
