import axios from 'axios'
import { 
    ORDERS_DETAILS_FAIL,
    ORDERS_DETAILS_REQUEST,
    ORDERS_DETAILS_SUCCESS,
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_DETAIL_FAIL, 
    ORDER_DETAIL_REQUEST, 
    ORDER_DETAIL_SUCCESS, 
    ORDER_LIST_FAIL, 
    ORDER_LIST_REQUEST, 
    ORDER_LIST_SUCCESS, 
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
} from "../contents/orderContents"
import { logOut } from './userActions'

// order create action
export const createOrder = (order) => async (dispatch, getState) => {
    
    try {
        dispatch({type: ORDER_CREATE_REQUEST})
        // get userInfo from the current user who already log in
        const {
            userLogIn: {userInfo}
        } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(`/api/orders`, order, config)
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message 
        })
    }
}

// get one order details
export const getOrderDetail = (id) => async (dispatch, getState) => {
    
    try {
        dispatch({type: ORDER_DETAIL_REQUEST})
        // get userInfo from the current user who already log in
        const {
            userLogIn: {userInfo}
        } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders/${id}`, config)
        dispatch({type: ORDER_DETAIL_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message 
        })
    }
}

// get all the orders
export const listOrders = () => async (dispatch, getState) => {
    
    try {
        dispatch({type: ORDER_LIST_REQUEST})
        // get userInfo from the current user who already log in
        const {
            userLogIn: {userInfo}
        } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders`, config)
        dispatch({type: ORDER_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message 
        })
    }
}

// pay order
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    
    try {
        dispatch({type: ORDER_PAY_REQUEST})
        // get userInfo from the current user who already log in
        const {
            userLogIn: {userInfo}
        } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
        dispatch({type: ORDER_PAY_SUCCESS, payload: data})
    } catch (error) {
        const message = error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message 
        if (message === 'Haven\'been authorized, no token was provided.') {
            dispatch(logOut())
        }
        dispatch({
            type: ORDER_LIST_FAIL, 
            payload: message
        })
    }
}

// pay order
export const getOrdersDetails = (userId) => async (dispatch, getState) => {
    
    try {
        dispatch({type: ORDERS_DETAILS_REQUEST})
        // get userInfo from the current user who already log in
        const {
            userLogIn: {userInfo}
        } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders/${userId}/all`, config)
        dispatch({type: ORDERS_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message 
        })
    }
}