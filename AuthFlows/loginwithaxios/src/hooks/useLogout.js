import axios from "../api/axios";
import { useGlobal } from "../context";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const navigate = useNavigate();
    const { setAuth } = useGlobal();
    const logout = async () => {
        setAuth({})
        try {
            await axios.get('/logout', { withCredentials: true })
            navigate('/linkpage')
        } catch (err) {
            console.log(err)
        }
    }
    return logout;
}

export default useLogout;