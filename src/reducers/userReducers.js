import { GET_USERS } from '../actions/types'


const initialState = {
    users: [],
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            console.log(action);

            console.log("Reducer works nicly");

            return {
                ...state,
                users: action.payload.data
            }
        default:
            return state
    }

}