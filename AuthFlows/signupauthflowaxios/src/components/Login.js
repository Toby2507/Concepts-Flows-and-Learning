import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGlobal } from '../context';
import axios from '../api/axios';

const Login = () => {
    const { setAuth } = useGlobal();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/login', JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            console.log(res);
            const accessToken = res?.data?.access_token;
            const roles = res?.data?.roles;
            if (res?.statusText === 'OK' && accessToken) {
                setAuth({ email, password, roles, accessToken });
                setEmail('');
                setPassword('');
                navigate(from, { replace: true });
            }
        } catch (err) {
            console.log(err);
            if (!err?.response) { setErrMsg('No Server Response') }
            else if (err.response?.status === 401) { setErrMsg('Wrong Username or Password') }
            else if (err.response?.status === 400) { setErrMsg('UnAuthorized') }
            else { setErrMsg(err?.message || 'Error logging in') }
            errRef.current.focus();
        }
    }

    useEffect(() => { userRef.current.focus() }, [])
    useEffect(() => { setErrMsg('') }, [email, password])

    return (
        <section>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address: </label>
                <input
                    type="email"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>Need an account?<br /><span className="line"><Link to='/register'>Sign Up</Link></span></p>
        </section>
    )
}

export default Login