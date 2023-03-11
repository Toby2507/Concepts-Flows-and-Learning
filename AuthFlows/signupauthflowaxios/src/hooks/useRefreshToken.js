import axios from '../api/axios'
import { useGlobal } from '../context'

const useRefreshToken = () => {
    const { setAuth } = useGlobal();
    const refresh = async () => {
        const res = await axios.get('/refresh', { withCredentials: true });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(res.data.accessToken);
            return { ...prev, accessToken: res.data.access_token }
        });
        return res?.data?.accessToken;
    }
    return refresh;
}

export default useRefreshToken