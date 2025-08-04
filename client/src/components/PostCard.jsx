import { Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
export const PostCard = ({ post }) => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const handleReadMore = () => {
    if (loggedIn) {
      navigate(`/blog/${post._id}`);
    } else {
      navigate("/login");
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
        </div>
      )}

      <div className="p-6">
        {/* Category Tag */}
        <div className="flex items-center gap-2 mb-3">
          <Tag size={16} className="text-blue-400" />
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
            {post.category?.name || "Uncategorized"}
          </span>
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
