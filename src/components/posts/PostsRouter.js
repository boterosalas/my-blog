import React from 'react';
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import PostDetail from './PostDetail';
import Posts from './Posts';

const PostsRouter = () => {
    return (
        <Routes>
            <Route
                exact
                path="/:slug"
                element={<PostDetail />}
            />
            <Route
                exact
                path="/"
                element={<Posts />} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    )
}

export default PostsRouter
