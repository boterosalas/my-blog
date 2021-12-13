import { types } from "../types/types";

const initialState = {
    users: localStorage.getItem(types.usersLocalStorage) ? JSON.parse(localStorage.getItem(types.usersLocalStorage)) : [],
    userSelected: null,
    startCreatingUser: false
    // userSelected: {
    //     id: '',
    //     name: '',
    //     email: '',
    //     password: '',
    //     cellphone: '',
    //     role: '',
    //     is_active: '',
    //     created_date: '',
    //     updated_date: ''
    // }
}


export const usersReducer = (state = initialState, action) => {


    switch (action.type) {
        case types.usersAddNew:
            return {
                ...state,
                users: action.payload
            }
        case types.usersStartCreatingUser:
            return {
                ...state,
                startCreatingUser: true
            }
        case types.usersStopCreatingUser:
            return {
                ...state,
                startCreatingUser: false
            }
        case types.usersDelete:
            return {
                userSelected: null,
                users: action.payload
            }
        case types.usersSelectedToNull:
            return {
                ...state,
                userSelected: null
            }
        case types.usersSelected:
            return {
                ...state,
                userSelected: action.payload
            }
            case types.usersUpdate:
                return {
                ...state,
                users: action.payload
            }
        default:
            return state;
    }
}