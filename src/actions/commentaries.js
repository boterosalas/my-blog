import { types } from "../types/types";



export const startToCreateCommentary = () => {
    return (dispatch) => {
        dispatch({
            type: types.commentaryStartToCreate
        })
    }
}

export const stopToCreateCommentary = () => {
    return (dispatch) => {
        dispatch({
            type: types.commentaryStopToCreate
        })
    }
}

export const startToUpdateCommentary = (id) => {
    return (dispatch) => {
        dispatch({
            type: types.commentaryStartToUpdate,
            payload: id
        })
    }
}

export const stopToUpdateCommentary = () => {
    return (dispatch) => {
        dispatch({
            type: types.commentaryStopToUpdate
        })
    }
}

export const createCommentary = (commentaryToAdd, posts, postId, resetForm) => {
    return (dispatch) => {
        const newCommentary =
        {
            id: new Date().getTime(),
            commentary: commentaryToAdd.commentary,
            user_id: commentaryToAdd.user_id,
            is_active: true,
            created_date: new Date().toLocaleString(),
            updated_date: new Date().toLocaleString()
        }
        const postsUpdated = posts.map(post => {
            if (post.id === postId) post.commentaries.push(newCommentary)
            return post;
        });
        dispatch({ type: types.postsUpdate, payload: postsUpdated });
        const lclStrg = JSON.parse(localStorage.getItem(types.postsLocalStorage));
        const setLcl = lclStrg.map(post => {
            if (post.id === postId) post.commentaries.push(newCommentary)
            return post;
        });
        localStorage.setItem(types.postsLocalStorage, JSON.stringify(setLcl));
        resetForm();
        dispatch(stopToCreateCommentary());
    }
}

export const updateCommentary = (commentaryToUpdate, posts, postId, resetForm) => {
    return (dispatch) => {
        const updatedCommentary =
        {
            id: commentaryToUpdate.id,
            commentary: commentaryToUpdate.commentary,
            user_id: commentaryToUpdate.user_id,
            is_active: commentaryToUpdate.is_active,
            created_date: commentaryToUpdate.created_date,
            updated_date: new Date().toLocaleString()
        }
        const postsUpdated = posts.map(post => {
            if (post.id === postId) {
                post.commentaries = post.commentaries.map(commentary => {
                    if (commentary.id === updatedCommentary.id) return updatedCommentary;
                    return commentary;
                })
            }
            return post;
        });
        dispatch({ type: types.postsUpdate, payload: postsUpdated });
        const lclStrg = JSON.parse(localStorage.getItem(types.postsLocalStorage));
        const setLcl = lclStrg.map(post => {
            if (post.id === postId) {
                post.commentaries.map(commentary => {
                    if (commentary.id === updatedCommentary.id) return updatedCommentary;
                    return commentary;
                })
            }
            return post;
        });
        localStorage.setItem(types.postsLocalStorage, JSON.stringify(setLcl));
        resetForm();
        dispatch(stopToUpdateCommentary());
    }
}
