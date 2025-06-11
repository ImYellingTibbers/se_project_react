import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, isLoggedIn, ...props }) {
  return isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/se_project_react/" replace />
  );
}

export default ProtectedRoute;
