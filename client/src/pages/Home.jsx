import { useState, useEffect } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PostCard } from "../components/PostCard";
import { useAuth } from "../utils/AuthContext";
import axios from "axios";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  useEffect(() => {
    const token = getToken();
    axios
      .get("http://localhost:4000/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("API response:", res.data.posts);
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              Latest{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Tech
              </span>{" "}
              Insights
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Discover cutting-edge tutorials, industry insights, and expert
              tips to accelerate your development journey
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
        {loading ? (
          <LoadingSpinner message={"Loading..."} />
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                All Posts ({posts.length})
              </h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-300 border border-slate-600">
                  Latest
                </button>
                <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-300 border border-slate-600">
                  Popular
                </button>
              </div>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No Posts Yet
                </h3>
                <p className="text-slate-400">
                  Check back soon for amazing content!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <PostCard key={post._id || post.title} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
