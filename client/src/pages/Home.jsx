import React from "react";
import PostCard from "../components/PostCard";
import { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/posts")
      .then((res) => {
        console.log("API response:", res.data.posts);
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>All blog posts</h1>
      {posts.length == 0 ? (
        <h1>Loading</h1>
      ) : (
        posts.map((post, index) => <PostCard key={index} post={post} />)
      )}
    </div>
  );
};

export default Home;
