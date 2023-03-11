import React, { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                const res = await axiosPrivate.get('/users', { signal: controller.signal });
                const emails = res.data.map(user => user.email);
                isMounted && setUsers(emails);
            } catch (err) {
                if (err?.message === 'canceled') console.log(err?.message);;
                if (err?.response?.status === 403) { navigate('/login', { state: { from: location }, replace: true }) }
            }
        }
        getUsers();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [location, navigate, axiosPrivate])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length ? (
                <ul>
                    {users.map((user, index) => {
                        return <li key={index}>{user}</li>
                    })}
                </ul>
            ) : <p>No users to display</p>}
            <br />
        </article>
    )
}

export default Users