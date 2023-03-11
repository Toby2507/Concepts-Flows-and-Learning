import React, { useRef, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import axios from "../api/axios";
import { useGlobal } from '../context';
import { useNavigate } from 'react-router-dom';

const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const navigate = useNavigate();
    const { setAuth } = useGlobal();
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState({ value: '', isValid: false, isFocused: false })
    const [password, setPassword] = useState({ value: '', isValid: false, isFocused: false })
    const [matchPwd, setMatchPwd] = useState({ value: '', isValid: false, isFocused: false })
    const [role, setRole] = useState('user');
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        if (!EMAIL_REGEX.test(email.value) || !PWD_REGEX.test(password.value)) {
            setErrMsg('Invalid username or password');
            return;
        }
        try {
            const res = await axios.post('/signup',
                JSON.stringify({ email: email.value, password: password.value, role }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(res);
            if (res?.statusText === 'OK') {
                const { email, access_token, roles } = res?.data;
                setAuth({ email, roles, access_token });
                setEmail({ value: '', isValid: false, isFocused: false });
                setPassword({ value: '', isValid: false, isFocused: false });
                setErrMsg('');
                navigate('/', { replace: true });
            }
        } catch (err) {
            const msg = err?.response?.data?.message || 'Error signing up';
            setErrMsg(msg);
            errRef.current.focus();
        }
    }

    useEffect(() => { userRef.current.focus() }, [])
    useEffect(() => { setEmail({ ...email, isValid: EMAIL_REGEX.test(email.value) }) }, [email.value])
    useEffect(() => {
        setPassword({ ...password, isValid: PWD_REGEX.test(password.value) });
        setMatchPwd({ ...matchPwd, isValid: matchPwd.value === password.value });
    }, [password.value, matchPwd.value])
    useEffect(() => { setErrMsg('') }, [email.value, password.value, matchPwd.value])

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email Address:
                    <span className={email.isValid ? "valid" : "hide"}><FaCheck /></span>
                    <span className={email.isValid || !email.value ? "hide" : "invalid"}><FaTimes /></span>
                </label>
                <input
                    type="email"
                    id='email'
                    ref={userRef}
                    autoComplete='off'
                    onChange={e => setEmail({ ...email, value: e.target.value })}
                    required
                    aria-invalid={email.isValid ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setEmail({ ...email, isFocused: true })}
                    onBlur={() => setEmail({ ...email, isFocused: false })}
                />
                <p id="uidnote" className={email.isFocused && email.value && !email.isValid ? "instructions" : "offscreen"}>
                    <FaInfoCircle />
                    4 to 24 characters.
                    <br />Must begin with a letter.
                    <br /> Letters, numbers, underscores, hyphens allowed.
                </p>
                <label htmlFor="role">Role:</label>
                <select id="role" onChange={e => setRole(e.target.value)}>
                    <option value=""></option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                </select>
                <label htmlFor="password">
                    Password:
                    <span className={password.isValid ? "valid" : "hide"}><FaCheck /></span>
                    <span className={password.isValid || !password.value ? "hide" : "invalid"}><FaTimes /></span>
                </label>
                <input
                    type="password"
                    id='password'
                    onChange={e => setPassword({ ...password, value: e.target.value })}
                    required
                    aria-invalid={password.isValid ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPassword({ ...password, isFocused: true })}
                    onBlur={() => setPassword({ ...password, isFocused: false })}
                />
                <p id="pwdnote" className={password.isFocused && password.value && !password.isValid ? "instructions" : "offscreen"}>
                    <FaInfoCircle />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters:
                    <span aria-label='exclamation mark'>!</span>
                    <span aria-label='at symbol'>@</span>
                    <span aria-label='hashtag'>#</span>
                    <span aria-label='dollar sign'>$</span>
                    <span aria-label='percent'>%</span>
                </p>
                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <span className={matchPwd.isValid && matchPwd.value ? "valid" : "hide"}><FaCheck /></span>
                    <span className={matchPwd.isValid || !matchPwd.value ? "hide" : "invalid"}><FaTimes /></span>
                </label>
                <input
                    type="password"
                    id='confirm_pwd'
                    onChange={e => setMatchPwd({ ...matchPwd, value: e.target.value })}
                    required
                    aria-invalid={matchPwd.value ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchPwd({ ...matchPwd, isFocused: true })}
                    onBlur={() => setMatchPwd({ ...matchPwd, isFocused: false })}
                />
                <p id="confirmnote" className={matchPwd.isFocused && !matchPwd.value ? "instructions" : "offscreen"}>
                    <FaInfoCircle />
                    Must match the first password input field.
                </p>
                <button disabled={!email.isValid || !password.isValid || !matchPwd.isValid}>Sign Up</button>
            </form>
            <p>Already registered? <br /><span className="line"><Link to='/login'>Sign In</Link></span></p>
        </section>
    )
}

export default Register