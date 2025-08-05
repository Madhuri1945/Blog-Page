import { Tag, User, Calendar, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { showError, showSuccess } from "../utils/toast";
import { useEffect } from "react";

export const PostCard = ({ post }) => {
  const { loggedIn, getToken } = useAuth();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(post.isFavorite || false);
  useEffect(() => {
    console.log(post.isFavorite);
    setIsFavorited(post.isFavorite || false);
  }, [post.isFavorite]);
  const handleReadMore = () => {
    if (loggedIn) {
      navigate(`/blog/${post._id}`);
    } else {
      navigate("/login");
    }
  };

  const handleFavorite = async (e) => {
    e.stopPropagation(); // Prevent triggering other click events

    if (!loggedIn) {
      navigate("/login");
      return;
    }
    const token = await getToken();
    try {
      const response = await axios.post(
        `http://localhost:4000/api/user/favorites/${post._id}`,
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

  return (
    <article className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl group">
      {/* Image */}
      {post.image && (
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Favorite Button - Positioned over image */}
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/70 backdrop-blur-sm hover:bg-slate-900/90 transition-all duration-300 group-hover:opacity-100 opacity-0"
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Star
              size={18}
              className={`transition-all duration-300 ${
                isFavorited
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-white hover:text-yellow-400"
              }`}
            />
          </button>
        </div>
      )}

      <div className="p-6">
        {/* Header with Category and Favorite (for posts without images) */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-blue-400" />
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {post.category?.name || "Uncategorized"}
            </span>
          </div>

          {/* Favorite Button - For posts without images */}
          {!post.image && (
            <button
              onClick={handleFavorite}
              className="p-1.5 rounded-full hover:bg-slate-700 transition-all duration-300"
              title={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Star
                size={18}
                className={`transition-all duration-300 ${
                  isFavorited
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-slate-400 hover:text-yellow-400"
                }`}
              />
            </button>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h2>

        {/* Content Preview */}
        <p className="text-slate-300 mb-4 line-clamp-3 leading-relaxed">
          {post.content}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
          {post.author && (
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{post.author}</span>
            </div>
          )}

          {post.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          )}

          {post.readTime && (
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{post.readTime}</span>
            </div>
          )}
        </div>

        {/* Read More Button */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <button
            onClick={handleReadMore}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 group/btn"
          >
            Read More
            <span className="inline-block ml-1 group-hover/btn:translate-x-1 transition-transform duration-300">
              →
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};
