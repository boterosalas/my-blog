import React from 'react';
import { useSelector } from 'react-redux';


// import { types } from '../../types/types';
import AllPosts from './AllPosts';
import PostForm from './PostForm';
// import { selectCategoryAlert } from './selectCategoryAlert';


const Posts = () => {
    const postsState = useSelector(state => state.posts);
    const { postSelected, categoryPostSelected } = postsState;

    const initialValues =
    {
        id: '',
        category_id: '',
        user_id: '',
        title: '',
        slug: '',
        short_text: '',
        long_text: '',
        image: '',
        likes: '',
        dislikes: '',
        commentaries: [],
        is_active: true,
        created_date: '',
        updated_date: ''
    }

    return (
        <>
            {
                categoryPostSelected
                    ? <PostForm post={postSelected || initialValues} />
                    : <AllPosts />
            }
        </>
    )
}

export default Posts
