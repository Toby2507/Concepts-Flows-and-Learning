import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useGlobal } from "../context";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useGlobal();

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    config.headers = { ...config.headers, Authorization: `Bearer ${auth.accessToken}` }
                }
                return config;
            }, err => Promise.reject(err)
        )
        const resInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async err => {
                const prevRequest = err?.config;
                if (err?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const accessToken = await refresh();
                    prevRequest.headers = { ...prevRequest.headers, Authorization: `Bearer ${accessToken}` }
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(err);
            }
        );
        return () => {
            axiosPrivate.interceptors.response.eject(resInterceptor);
            axiosPrivate.interceptors.request.eject(requestInterceptor);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate