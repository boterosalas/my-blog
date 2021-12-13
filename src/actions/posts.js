import { types } from "../types/types"
import Swal from 'sweetalert2';
import { finishLoading, startLoading } from './ui';


export const addPost = (postToAdd, posts, resetForm) => {
    return (dispatch) => {
        dispatch(startLoading());
        const newPost = {
            id: new Date().getTime(),
            category_id: postToAdd.category_id,
            user_id: postToAdd.user_id,
            title: postToAdd.title,
            slug: postToAdd.slug,
            short_text: postToAdd.short_text,
            long_text: postToAdd.long_text,
            image: postToAdd.image,
            likes: [],
            dislikes: [],
            commentaries: [],
            is_active: postToAdd.is_active,
            created_date: new Date().toLocaleString(),
            updated_date: new Date().toLocaleString()
        }
        const checkPost = posts.filter(post => post.title.toLowerCase().trim() === postToAdd.title.toLowerCase().trim())[0];
        if (checkPost) {
            Swal.fire('Error', 'Ya existe ese post, intenta con otro título.', 'error');
        } else {
            posts.unshift(newPost);
            dispatch({
                type: types.postsAddNew,
                payload: posts
            });
            const lclStrg = JSON.parse(JSON.stringify(posts));
            const setLcl = lclStrg.map(post => {
                if (post.id === newPost.id) {
                    post.image = 'https://my-blog-ab703.web.app/images/default.png';
                }
                return post;
            })
            localStorage.setItem(types.postsLocalStorage, JSON.stringify(setLcl));
            Swal.fire(postToAdd.title, 'Post creado correctamente.', 'success').then(res => {
                dispatch(selectPostCategoryToNull());
                resetForm();
            });
        }
        dispatch(finishLoading());
    }
}

export const updatePost = (updatedPost, posts, resetForm) => {
    return (dispatch) => {
        dispatch(startLoading());
        Swal.fire({
            title: updatedPost.title,
            text: `¿Seguro que deseas actualizar este post?`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Sí',
            reverseButtons: true,
            focusConfirm: true
        }).then(res => {
            if (res.value) {
                const updatedPosts = posts.map(post => {
                    if (post.id === updatedPost.id) {
                        return {
                            id: updatedPost.id,
                            category_id: updatedPost.category_id,
                            user_id: updatedPost.user_id,
                            title: updatedPost.title,
                            slug: updatedPost.slug,
                            short_text: updatedPost.short_text,
                            long_text: updatedPost.long_text,
                            image: updatedPost.image,
                            likes: updatedPost.likes,
                            dislikes: updatedPost.dislikes,
                            commentaries: updatedPost.commentaries,
                            is_active: updatedPost.is_active,
                            created_date: updatedPost.created_date,
                            updated_date: new Date().toLocaleString()
                        }
                    };
                    return post;
                });
                dispatch({
                    type: types.postsUpdate,
                    payload: updatedPosts
                });
                const lclStrg = JSON.parse(localStorage.getItem(types.postsLocalStorage));
                const setLcl = lclStrg.map(post => {
                    if (post.id === updatedPost.id) {
                        return {
                            id: updatedPost.id,
                            category_id: updatedPost.category_id,
                            user_id: updatedPost.user_id,
                            title: updatedPost.title,
                            slug: updatedPost.slug,
                            short_text: updatedPost.short_text,
                            long_text: updatedPost.long_text,
                            image: 'https://my-blog-ab703.web.app/images/default.png',
                            likes: updatedPost.likes,
                            dislikes: updatedPost.dislikes,
                            commentaries: updatedPost.commentaries,
                            is_active: updatedPost.is_active,
                            created_date: updatedPost.created_date,
                            updated_date: new Date().toLocaleString()
                        }
                    }
                    return post;
                })
                localStorage.setItem(types.postsLocalStorage, JSON.stringify(setLcl));
                Swal.fire(updatedPost.title, 'Post actualizado correctamente.', 'success').then(res => {
                    resetForm();
                    dispatch(selectPostCategoryToNull());
                    dispatch(selectedPostToNull());
                })
                dispatch(finishLoading());
            }
        })
    }
}

export const setLikeToPost = (posts, postLikedId, userId) => {
    return (dispatch) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postLikedId) {
                if (!post.likes.includes(userId)) {
                    post.likes.push(userId);
                } else {
                    const idx = post.likes.indexOf(userId);
                    post.likes.splice(idx, 1);
                }
                if (post.dislikes.includes(userId)) {
                    const idx = post.dislikes.indexOf(userId);
                    post.dislikes.splice(idx, 1);
                }
            }
            return post;
        });
        dispatch({
            type: types.postsUpdate,
            payload: updatedPosts
        });
        const lclStrg = JSON.parse(localStorage.getItem(types.postsLocalStorage));
        const setLcl = lclStrg.map(post => {
            if ((post.id === postLikedId) && !(post.likes.includes(userId))) post.likes.push(userId);
            return post;
        });
        localStorage.setItem(types.postsLocalStorage, JSON.stringify(setLcl));
    }
}

export const setDislikeToPost = (posts, postDislikedId, userId) => {
    return (dispatch) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postDislikedId) {
                if (!post.dislikes.includes(userId)) {
                    post.dislikes.push(userId);
                } else {
                    const idx = post.dislikes.indexOf(userId);
                    post.dislikes.splice(idx, 1);
                }
                if (post.likes.includes(userId)) {
                    const idx = post.likes.indexOf(userId);
                    post.likes.splice(idx, 1);
                }
            }
            return post;
        });
        dispatch({
            type: types.postsUpdate,
            payload: updatedPosts
        });
        const lclStrg = JSON.parse(localStorage.getItem(types.postsLocalStorage));
        const setLcl = lclStrg.map(post => {
            if ((post.id === postDislikedId) && !(post.dislikes.includes(userId))) post.dislikes.push(userId);
            return post;
        });
        localStorage.setItem(types.postsLocalStorage, JSON.stringify(setLcl));
    }
}

export const selectPost = (post) => {
    return (dispatch) => {
        dispatch({
            type: types.postsSelected,
            payload: post
        });
    }
}

export const selectedPostToNull = (post) => {
    return (dispatch) => {
        dispatch({
            type: types.postsSelectedToNull
        });
    }
}

export const selectPostCategory = (category) => {
    return (dispatch) => {
        dispatch({
            type: types.postsSelectCategory,
            payload: category
        });
    }
}

export const selectPostCategoryToNull = () => ({
    type: types.postsSelectCategoryToNull
})
