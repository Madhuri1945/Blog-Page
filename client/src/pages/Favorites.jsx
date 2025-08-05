import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../utils/AuthContext";
import SingleBlog from "./SingleBlog";
const Favorites = () => {
  const [fav, setFav] = useState([]);
  const { getToken } = useAuth();
  useEffect(() => {
    const token = getToken();
    axios
      .get("http://localhost:4000/api/user/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFav(res.data);
      });
  }, []);
  return (
    <div>
      {fav.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
};

export default Favorites;
