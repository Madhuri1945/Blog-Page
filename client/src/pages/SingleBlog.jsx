import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { showError, showSuccess } from "../utils/toast";
import { useAuth } from "../utils/AuthContext";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`http://localhost:4000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { likesCount, likedByCurrentUser, isFavorite } = res.data;
        console.log(isFavorite);
        setBlog(res.data);
        setLikesCount(likesCount);
        setIsLiked(likedByCurrentUser);
        setLoading(false);
        setIsFavorited(isFavorite);
      } catch (err) {
        setError("Blog not found or an error occurred");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, getToken]);

  const handleLike = async () => {
    try {
      const token = await getToken();

      const response = await axios.post(
        `http://localhost:4000/api/posts/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { likesCount, likedByCurrentUser } = response.data;
      setLikesCount(likesCount);
      setIsLiked(likedByCurrentUser);

      if (likedByCurrentUser) {
        showSuccess("Blog liked");
      } else {
        showError("Blog unliked");
      }
    } catch (err) {
      console.error("Error liking post:", err);
      showError("Something went wrong while liking the post");
    }
  };

  const handleFavorite = async () => {
    const token = await getToken();
    try {
      const response = await axios.post(
        `http://localhost:4000/api/user/favorites/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { isFavorite } = response.data;
      console.log("API response isFavorite:", isFavorite);

      setIsFavorited(isFavorite);

      if (isFavorite) {
        showSuccess("Added to Favorites");
      } else {
        showError("Removed From Favorites");
      }
    } catch (err) {
      console.log(err);
      showError("Something went wrong");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const formatContent = (content) => {
    // Split content into paragraphs and format
    const paragraphs = content.split("\n\n").filter((p) => p.trim());
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-6 text-slate-300 text-lg leading-relaxed">
        {paragraph.trim()}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <LoadingSpinner message={"Blog is loading"} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-white mb-2">No Blog Found</h2>
          <p className="text-slate-400">
            The requested blog post doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Articles
          </button>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {/* Category & Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-full uppercase tracking-wide">
              {blog.category}
            </span>
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                5 min read
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Published recently
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            {blog.title}
          </h2>

          {/* Author & Engagement */}
          <div className="flex items-center justify-between border-b border-slate-700 pb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <div className="text-white font-semibold">Tech Author</div>
                <div className="text-slate-400 text-sm">
                  Technology Enthusiast
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  onClick={handleLike}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="font-medium">{likesCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="font-medium">
                  {blog.comments?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          {blog.imageUrl ? (
            <div className="relative group">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-64 md:h-96 lg:h-[500px] object-cover rounded-2xl border border-slate-700 transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl"></div>
            </div>
          ) : (
            <div className="w-full h-64 md:h-96 lg:h-[500px] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl border border-slate-600 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-16 h-16 text-slate-500 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-slate-500 text-lg">
                  {blog.category} Article
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="prose prose-invert prose-slate max-w-none mb-12">
          <div className="text-xl leading-relaxed">
            {formatContent(blog.content)}
          </div>
        </div>

        {/* Engagement Actions */}
        <div className="border-t border-slate-700 pt-8 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                  isLiked
                    ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg shadow-pink-500/25"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600 hover:border-slate-500"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="font-medium">
                  {isLiked ? "Liked" : "Like"}
                </span>
                <span className="bg-black/20 px-2 py-1 rounded-full text-sm">
                  {likesCount}
                </span>
              </button>

              <button
                onClick={handleFavorite}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                  isFavorited
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/25"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600 hover:border-slate-500"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={isFavorited ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <span className="font-medium">
                  {isFavorited ? "Saved" : "Save to Favorites"}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-300 border border-slate-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        {blog.comments && blog.comments.length > 0 && (
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Comments ({blog.comments.length})
            </h3>
            <div className="space-y-6">
              {blog.comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 rounded-xl p-6 border border-slate-600"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {comment.author?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-white">
                          {comment.author || "Anonymous User"}
                        </span>
                        <span className="text-sm text-slate-400 bg-slate-700 px-2 py-1 rounded-full">
                          {comment.date || "Recently"}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {comment.content || comment.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default SingleBlog;
