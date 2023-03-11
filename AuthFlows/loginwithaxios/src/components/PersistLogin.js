import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import { useGlobal } from "../context";
import useLocalStorage from "../hooks/useLocalStorage";

const PersistLogin = () => {
    const [persist] = useLocalStorage('persist', false)
    const [loading, setLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useGlobal();

    useEffect(() => {
        let isMounted = true;
        const verifyToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            } finally {
                isMounted && setLoading(false);
            }
        }
        !auth?.accessToken ? verifyToken() : setLoading(false);
        return () => isMounted = false
    }, [])

    return (
        <>
            {!persist ? <Outlet /> : loading ? <p>Loading...</p> : <Outlet />}
        </>
    )
}

export default PersistLogin;