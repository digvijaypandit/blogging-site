import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
  const { status, loading } = useSelector((state) => state.auth);

  // Still fetching user data
  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  // For authenticated routes (like /add-post)
  if (authentication && !status) {
    return <Navigate to="/login" />;
  }

  // For unauthenticated routes (like /login, /signup)
  if (!authentication && status) {
    return <Navigate to="/" />;
  }

  return children;
}
