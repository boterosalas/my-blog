import { types } from "../types/types"

// const state = {
//     uid: 123412351235,
//     name: 'David'
// }

export const authReducer = (state = {}, action) => {


    switch (action.type) {
        case types.login:
            return {
                id: action.payload.id,
                name: action.payload.name,
                token: action.payload.token
            }
        case types.logout:
            return {}
        case types.authUserLocalStorage:
            return {

            }
        default:
            return state;
    }
}