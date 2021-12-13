import React from 'react';
import { useNavigate } from 'react-router-dom';

const MorePosts = ({ posts }) => {

    const navigate = useNavigate();

    const redirectToDetail = (slug) => {
        navigate(`../${slug}`)
    }

    return (
        <>
            <h3>Mira otros posts</h3>
            <ul className="list-group list-group-flush">
                {
                    posts.map(post => {
                        return (
                            <li
                                key={post.id}
                                className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="pointer" onClick={() => redirectToDetail(post.slug)}>{post.title}</span>
                                <div className="d-flex flex-row">
                                    <span className="badge bg-primary rounded-pill me-1">{post.likes.length}</span>
                                    <span className="badge bg-danger rounded-pill">{post.dislikes.length}</span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default MorePosts
