import { combineReducers } from 'redux'
import userReducers from './userReducers'
import authReducer from './authReducer'

export default combineReducers({
    users: userReducers,
    auth  : authReducer
})