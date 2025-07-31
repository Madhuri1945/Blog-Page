import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children, role }) => {
  const user = Json.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/unauthorized" />;
  return children;
};
