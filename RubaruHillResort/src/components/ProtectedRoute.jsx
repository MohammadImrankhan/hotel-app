import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // ✅ simple and safe check
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
