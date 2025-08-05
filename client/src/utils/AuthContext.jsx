// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { showError } from "./toast";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      fetchUserProfile(token);
    }
  }, []);
  const fetchUserProfile = async (token) => {
    try {
      const res = await axios.get("http://localhost:4000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);

      setLoggedIn(false);
      setUser(null);
      localStorage.removeItem("token");
    }
  };
  const login = async (token) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
    await fetchUserProfile(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser(null);
  };
  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, getToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
