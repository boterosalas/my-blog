import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPostsMostVoted } from '../../helpers/helpers';

const MostVotedPosts = () => {

    const postsState = useSelector(state => state.posts);
    const { posts } = postsState;
    const categoriesState = useSelector(state => state.categories);
    const { categories } = categoriesState;
    const [postsToDisplay, setPostsToDisplay] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setPostsToDisplay(getPostsMostVoted(posts));
    }, [posts])

    const handleClickPost = (post) => {
        navigate(`posts/${post.slug}`);
    }

    const getCategoryNameById = (id) => {
        const category = categories.filter(cat => cat.id === id)[0];
        return category.name;
    }

    return (
        <>
            {postsToDisplay.length > 0 &&
                <>
                    <h2 className="most-voted-title">Posts más votados.</h2>
                    <ul className="list-group">
                        {
                            postsToDisplay.map(post => {
                                return (
                                    <li className="list-group-item d-flex justify-content-between align-items-center" key={post.id}>
                                        <span className="pointer" onClick={() => handleClickPost(post)}>
                                            {post.title} - <span className="fs-08 italic">{getCategoryNameById(post.category_id)}</span>
                                        </span>
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
            }
        </>
    )
}

export default MostVotedPosts

