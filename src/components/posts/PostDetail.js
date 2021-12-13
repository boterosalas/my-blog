import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setDislikeToPost, setLikeToPost } from '../../actions/posts';
import { getMoreSimilarPosts } from '../../helpers/helpers';
import AllCommentaries from '../commentaries/AllCommentaries';
import CommentaryForm from '../commentaries/CommentaryForm';
import MorePosts from './MorePosts';

const PostDetail = () => {

    const dispatch = useDispatch();
    const postsState = useSelector(state => state.posts);
    const authState = useSelector(state => state.auth);
    const categoriesState = useSelector(state => state.categories);
    const { posts } = postsState;
    const { categories } = categoriesState;
    const [currentPost, setCurrentPost] = useState(null);
    const [currentCategory, setCurrentCategory] = useState({});
    const [similarPosts, setSimilarPosts] = useState([]);

    const { slug } = useParams();

    useEffect(() => {
        const post = posts.filter(elem => elem.slug === slug)[0];
        const category = categories.filter(elem => elem.id === post.category_id)[0];
        const getSimilarPosts = getMoreSimilarPosts(post, posts, category, categories);
        setCurrentPost(post);
        setCurrentCategory(category);
        setSimilarPosts(getSimilarPosts);
    }, [slug, posts, categories]);

    const handleLike = () => {
        dispatch(setLikeToPost(posts, currentPost.id, authState.id));
    }

    const handleDislike = () => {
        dispatch(setDislikeToPost(posts, currentPost.id, authState.id));
    }


    return (
        <>
            {currentPost &&
                <>
                    <h1>{currentPost.title}</h1>
                    <hr />
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <div className="row">
                                <div className="col col-sm-3">
                                    <img src={currentPost.image} className="img-fluid rounded d-block" alt={currentPost.title} />
                                    <div className="d-flex justify-content-around mt-2">
                                        <div className="d-flex flex-column">
                                            <i className={`fa-thumbs-down far fa-lg pointer ${currentPost.dislikes.includes(authState.id) ? 'fas' : 'far'}`} onClick={handleDislike}></i>
                                            <span>{currentPost.dislikes.length}</span>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <i className={`fa-thumbs-up fa-lg pointer ${currentPost.likes.includes(authState.id) ? 'fas' : 'far'}`} onClick={handleLike}></i>
                                            <span>{currentPost.likes.length}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-sm-9">
                                    <p className="text-end text-category-container">Categoría:<span className="text-category">{currentCategory.name}</span></p>
                                    <p>{currentPost.long_text}</p>
                                    <p className="mb-0 fs-09">Creado en: <span className="text-date">{currentPost.created_date}</span></p>
                                    <p className="mt-0 fs-09">Última actualización: <span className="text-date">{currentPost.updated_date}</span></p>
                                </div>
                            </div>
                            {(currentPost.commentaries.length > 0) && <AllCommentaries currentPost={currentPost} commentariesToDisplay={currentPost.commentaries} />}
                            <CommentaryForm postId={currentPost.id} />
                        </div>
                        <div className="col-12 col-md-4 border-secondary border-start-1">
                            <MorePosts posts={similarPosts} />
                        </div>
                    </div>
                </>}
        </>
    )
}

export default PostDetail
