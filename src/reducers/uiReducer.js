import { types } from "../types/types"


// const state = {
//     uid: 123412351235,
//     name: 'David'
// }


export const uiReducer = (state = {}, action) => {


    switch (action.type) {
        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }
        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}