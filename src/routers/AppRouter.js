import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { types } from '../types/types';
import PrivateRouter from './PrivateRouter';
import LoginScreen from '../components/auth/LoginScreen';

import Categories from '../components/categories/Categories';
import Users from '../components/users/Users';
import PostsRouter from '../components/posts/PostsRouter';
import Home from '../components/home/Home';

const AppRouter = () => {

    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem(types.authUserLocalStorage));
        if (auth) {
            dispatch({
                type: types.login,
                payload: {
                    id: auth.id,
                    name: auth.name,
                    token: auth.token
                }
            });
        }
    }, [dispatch]);

    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        exact
                        path="/auth"
                        element={
                            (authState.token)
                                ? (<Navigate replace to="/" />)
                                : (<LoginScreen />)
                        }
                    />
                    <Route
                        exact
                        path="/"
                        element={
                            (authState.token)
                                ? (<PrivateRouter />)
                                : (<Navigate replace to="/auth" />)
                        }
                    >
                        <Route path="" element={<Home />} />
                        <Route path="users" element={<Users />} />
                        <Route path="posts/*" element={<PostsRouter />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="*" element={<Navigate replace to="users" />} />
                    </Route>
                    <Route path="*" element={<Navigate replace to="/auth" />} />
                </Routes>
            </div>
        </Router>
    )
}

export default AppRouter
