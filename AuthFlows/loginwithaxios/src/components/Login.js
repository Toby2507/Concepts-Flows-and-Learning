import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useGlobal } from '../context';
import axios from '../api/axios';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';

const Login = () => {
    const { setAuth } = useGlobal();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const userRef = useRef();
    const errRef = useRef();

    const [email, emailAttribs, resetEmail] = useInput('email', '');
    const [password, setPassword] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/login', JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            const accessToken = res?.data?.accessToken;
            if (res?.statusText === 'OK' && accessToken) {
                setAuth({ email, accessToken });
                resetEmail();
                setPassword('');
                navigate(from, { replace: true });
            }
        } catch (err) {
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
                    {...emailAttribs}
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
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={toggleCheck}
                        checked={check}
                    />
                    <label htmlFor="persist">Trust this device</label>
                </div>
            </form>
            <p>Need an account?<br /><span className="line"><Link to='/register'>Sign Up</Link></span></p>
        </section>
    )
}

export default Login