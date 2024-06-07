import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return null;

  if (isAuthenticated) return <Outlet />;

  return <Navigate to="/" replace />;

  // return isAuthenticated ? (
  //   <Outlet /> // basically means, render all child routes .
  // ) : (
  //   <Navigate to="/" replace />
  // );
};

export default ProtectedRoute;
