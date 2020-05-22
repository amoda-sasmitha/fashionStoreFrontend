import { GET_CART , GET_CATEGORIES } from '../actions/types'


const initialState = {
   cart : [],
   categories : []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                cart: action.payload
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories : action.payload
            }
        default:
            return state
    }

}