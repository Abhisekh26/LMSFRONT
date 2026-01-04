import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RoleGuard({ role, children }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" />;
  if (user.occupation !== role) return <Navigate to="/" />;

  return children;
}
