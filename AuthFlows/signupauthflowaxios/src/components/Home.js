import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobal } from '../context'
import axios from '../api/axios'

const Home = () => {
    const { setAuth } = useGlobal()
    const navigate = useNavigate()
    const logout = async () => {
        try {
            await axios.get('/logout', { withCredentials: true })
            setAuth(null)
            navigate('/linkpage')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home