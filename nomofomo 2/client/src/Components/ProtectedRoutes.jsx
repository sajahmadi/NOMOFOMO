import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({ authenticated }) {
  if (!authenticated) return <Navigate to="/login" />;
  return <Outlet />;
}

export default ProtectedRoutes;
