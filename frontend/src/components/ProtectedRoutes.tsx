import { Outlet, Navigate } from "react-router-dom";
import { authClient } from "../utils/auth-client";

const ProtectedRoutes = () => {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) return null;

    if (!session) return <Navigate to="/login" />;

    return <Outlet />;
}

export default ProtectedRoutes;