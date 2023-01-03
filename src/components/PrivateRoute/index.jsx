import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/context';

export default function PrivateRoute({ children }) {
    const [logged, setLogged] = useContext(Context);

    if (logged) {
        return (children)
    } else {
        return (
            <div className="container">
                <div className="private-route">
                    <h2>Login to access this page.</h2>
                    <Link to="/">Login</Link>
                </div>
            </div>
        )
    }

}
