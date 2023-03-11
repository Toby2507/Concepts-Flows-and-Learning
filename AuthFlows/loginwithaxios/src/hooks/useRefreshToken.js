import axios from '../api/axios'
import { useGlobal } from '../context'

const useRefreshToken = () => {
    const { setAuth } = useGlobal();
    const refresh = async () => {
        const res = await axios.get('/refresh', { withCredentials: true });
        setAuth(prev => {
            console.log('Refreshed');
            return { ...prev, accessToken: res.data.accessToken }
        });
        return res?.data?.accessToken;
    }
    return refresh;
}

export default useRefreshToken