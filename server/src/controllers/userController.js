import User from "../models/User.js";
import Post from "../models/Post.js";
export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { username, email } = req.body;
  const profileImage = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : undefined;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      username,
      email,
      profileImage,
    },
    { new: true }
  ).select("-password");
  res.json(updatedUser);
};
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};
export const favoriteBlogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const postId = req.params.id;
    const post=await Post.findById(postId);
    const alreadyFav = user.favorites.some(
      (favId) => favId.toString() === postId
    );

    if (alreadyFav) {
      user.favorites.pull(postId);
      post.favorites.pull(postId);
    } else {
      user.favorites.push(postId);
      post.favorites.push(postId);
    }

    await user.save();

    res.json({ favorites: user.favorites, isFavorite: !alreadyFav });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getFavoriteBlogs = async (req, res) => {
  const user = await User.findById(req.user.id).populate({
    path: "favorites",
    options: { sort: { createdAt: -1 } },
    populate: {
      path: "category",
      select: "name",
    },
  });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user.favorites);
};
