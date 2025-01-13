import { Navigate } from "react-router-dom";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";

export default function ProtectedRoute({ children }) {
  const token = useAppSelector(selectCurrentToken);
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
