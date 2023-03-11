import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import { useGlobal } from "../context";

const PersistLogin = () => {
    const [loading, setLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useGlobal();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        !auth?.email ? verifyToken() : setLoading(false);
    }, [])
    useEffect(() => {
        console.log(`loading: ${loading}`);
        console.log(`auth: ${auth?.accessToken}`);
    }, [loading, auth])

    return (
        <>
            {loading ? <h1>Loading...</h1> : <Outlet />}
        </>
    )
}

export default PersistLogin;