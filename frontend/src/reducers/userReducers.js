
import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET
    
} from '../contents/userContents';



// user log in reducer
export const userLogInReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST: 
            return {loading: true}
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL: 
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state 
    }
}

// register reducer
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST: 
            return {loading: true}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL: 
            return {loading: false, error: action.payload}
        default:
            return state 
    }
}

// get user profile
export const getUserProfileReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST: 
            return {loading: true, ...state}
        case USER_DETAIL_SUCCESS:
            return {loading: false, user: action.payload}
        case USER_DETAIL_FAIL: 
            return {loading: false, error: action.payload}
        // case USER_DETAIL_RESET:
        //     return { user: {} }
        default:
            return state 
    }
}


// update user information reducer
export const updateUserProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST: 
            return {loading: true, ...state}
        case USER_UPDATE_SUCCESS:
            return {loading: false, userInfo: action.payload, success: true}
        case USER_UPDATE_FAIL: 
            return {loading: false, error: action.payload}
        case USER_UPDATE_RESET:
            return {}
        default:
            return state 
    }
}