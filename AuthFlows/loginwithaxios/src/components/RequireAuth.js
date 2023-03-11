import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../context";
import jwt_decode from 'jwt-decode';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useGlobal();
    const location = useLocation();
    const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : {};
    const roles = decoded?.roles || [];

    return (
        roles.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.email
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth