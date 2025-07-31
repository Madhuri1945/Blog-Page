import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="border p-4 m-2 bg-white rounded shadow">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-700 mb-2">{post.content}</p>

      {/* Safely accessing nested data */}
      <p className="text-sm text-gray-600">
        Category: {post.category?.name || "Uncategorized"}
      </p>

      {/* Optional: render image if available */}
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full h-auto mt-2 rounded"
        />
      )}
    </div>
  );
};

export default PostCard;
