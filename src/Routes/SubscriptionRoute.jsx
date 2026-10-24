import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function SubscriptionRoute() {
  const { currentUser, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!currentUser?.isSubscribed) {
    return <Navigate to="/subscription" replace />;
  }

  return <Outlet />;
}

export default SubscriptionRoute;