import { GET_USERS } from './types'
import {setCurrentUser} from './authActions'

// import axiios
import Axios from "axios";

export function getUserDetails() {
    console.log("this is work");

    return (dispatch) => {
        return Axios.get('http://localhost:4000/user/all').then((response) => {
            dispatch({
                type: GET_USERS,
                payload: response
            })
        }).catch(err => {
            console.error(err);

        });

    }
}

// export function loginCheck(){
//     return dispatch => {
//         dispatch()
//     }
// }