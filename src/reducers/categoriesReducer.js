import { types } from "../types/types";

const initialState = {
    categories: JSON.parse(localStorage.getItem(types.categoriesLocalStorage)) || [],
    // categorySelected: {
    // id: '',
    // name: '',
    // is_active: '',
    // created_date: '',
    // updated_date: ''
    // }
    categorySelected: null,
    startCreatingCategory: false
}


export const categoriesReducer = (state = initialState, action) => {


    switch (action.type) {
        case types.categoriesAddNew:
            return {
                ...state,
                categories: action.payload
            }
        case types.categoriesStartCreatingCategory:
            return {
                ...state,
                startCreatingCategory: true
            }
        case types.categoriesStopCreatingCategory:
            return {
                ...state,
                startCreatingCategory: false
            }
        case types.categoriesDelete:
            return {
                ...state,
                categories: action.payload
            }
        case types.categoriesSelectedToNull:
            return {
                ...state,
                categorySelected: null
            }
        case types.categoriesSelected:
            return {
                ...state,
                categorySelected: action.payload
            }
        case types.categoriesUpdate:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state;
    }
}