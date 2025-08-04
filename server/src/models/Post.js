import mongoose, { Schema, model } from "mongoose";
const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    image: { type: String, default: null },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);
export default model("Post", postSchema);
