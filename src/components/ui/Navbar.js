import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { logout } from '../../actions/auth';
import { types } from '../../types/types';

const Navbar = props => {

    const navigate = useNavigate();
    const { auth: authRedux } = useSelector(state => state);
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logout());
        navigate('/login')
    }

    useEffect(() => {
        const lclStrg = JSON.parse(localStorage.getItem(types.usersLocalStorage));
        const currentUser = lclStrg.filter(x => x.id === authRedux.id)[0];
        setIsAdmin(currentUser.role === 'admin' ? true : false)
    }, [authRedux])

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Inicio</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink end="active" to="/posts" className="nav-link">Posts</NavLink>
                        </li>
                        {
                            isAdmin &&
                            <li className="nav-item">
                                <NavLink end="active" to="/users" className="nav-link">Usuarios</NavLink>
                            </li>
                        }
                        {
                            isAdmin &&
                            <li className="nav-item">
                                <NavLink end="active" to="/categories" className="nav-link">Categorias</NavLink>
                            </li>
                        }
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <span className="nav-link pointer" onClick={handleLogOut}>Salir</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
