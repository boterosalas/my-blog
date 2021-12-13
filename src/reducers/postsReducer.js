import { types } from "../types/types";

// const initialCategorySelected = { "id": 1638670878605, "name": "karen ochoa", "is_active": true, "created_date": "4/12/2021 21:21:18", "updated_date": "5/12/2021 00:41:27" }
// const initialPostSelected = { id: '', category_id: '', user_id: '', title: '', slug: '', short_text: '', long_text: '', image: '', likes: '', dislikes: '', is_active: '', created_date: '', updated_date: '' };
const initialState = {
    posts: localStorage.getItem(types.postsLocalStorage) ? JSON.parse(localStorage.getItem(types.postsLocalStorage)) : [],
    categoryPostSelected: null,
    postSelected: null,
    editingCommentary: null,
    creatingCommentary: false
    // categoryPostSelected: initialCategorySelected,
    // postSelected: initialPostSelected
}


export const postsReducer = (state = initialState, action) => {


    switch (action.type) {
        case types.postsAddNew:
            return {
                ...state,
                posts: action.payload
            }
        case types.postsSelectCategoryToNull:
            return {
                ...state,
                categoryPostSelected: null
            }
        case types.postsSelectCategory:
            return {
                ...state,
                categoryPostSelected: action.payload
            }
        case types.postsUpdate:
            return {
                ...state,
                posts: action.payload
            }
        case types.postsSelected:
            return {
                ...state,
                postSelected: action.payload
            }
        case types.postsSelectedToNull:
            return {
                ...state,
                postSelected: null
            }
        case types.commentaryStartToCreate:
            return {
                ...state,
                creatingCommentary: true
            }
        case types.commentaryStopToCreate:
            return {
                ...state,
                creatingCommentary: false
            }
        case types.commentaryStartToUpdate:
            return {
                ...state,
                editingCommentary: action.payload
            }
        case types.commentaryStopToUpdate:
            return {
                ...state,
                editingCommentary: null
            }
        default:
            return state;
    }
}