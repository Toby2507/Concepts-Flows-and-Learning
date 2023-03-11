import React, { useState, useEffect } from 'react'
import axios from '../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';

const Users = () => {
    const refresh = useRefreshToken();
    const [users, setUsers] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                const res = await axios.get('/users', { signal: controller.signal });
                console.log(res.data);
                isMounted && setUsers(res.data);
            } catch (err) {
                console.log(err);
                // if (err?.message !== 'canceled') { navigate('/login', { state: { from: location }, replace: true }) }
            }
        }
        getUsers();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [location, navigate])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length ? (
                <ul>
                    {users.map((user, index) => {
                        return <li key={index}>{user?.email}</li>
                    })}
                </ul>
            ) : <p>No users to display</p>}
            <button onClick={() => refresh()}>Refresh</button>
            <br />
        </article>
    )
}

export default Users