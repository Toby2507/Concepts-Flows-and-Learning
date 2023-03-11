import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../context";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useGlobal();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.email
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth