import mongoose, { Schema, model } from "mongoose";
const postSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
});
export default model("Post", postSchema);
