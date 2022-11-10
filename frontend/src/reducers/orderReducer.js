import { 
    ORDERS_DELIVERED_FAIL,
    ORDERS_DELIVERED_REQUEST,
    ORDERS_DELIVERED_SUCCESS,
    ORDERS_DETAILS_FAIL,
    ORDERS_DETAILS_REQUEST,
    ORDERS_DETAILS_RESET,
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
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS
} from "../contents/orderContents"


// order create in reducer
export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST: 
            return {loading: true}
        case ORDER_CREATE_SUCCESS:
            return {loading: false, order: action.payload, success: true}
        case ORDER_CREATE_FAIL: 
            return {loading: false, error: action.payload}
        default:
            return state 
    }
}

// order create in reducer
export const orderDetailReducer = (
    state = {
        orderItems: [], 
        shippingAddress: {}, 
        loading: true
    }, 
    action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST: 
            return {...state, loading: true}
        case ORDER_DETAIL_SUCCESS:
            return {loading: false, order: action.payload}
        case ORDER_DETAIL_FAIL: 
            return {loading: false, error: action.payload}
        default:
            return state 
    }
}

// get all the orders
export const orderListReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST: 
            return {loading: true, orders: []}
        case ORDER_LIST_SUCCESS:
            return {loading: false, orders: action.payload}
        case ORDER_LIST_FAIL: 
            return {loading: false, error: action.payload}
        default:
            return state 
    }
}

// pay order
export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST: 
            return {loading: true}
        case ORDER_PAY_SUCCESS:
            return {loading: false, success: true}
        case ORDER_PAY_FAIL: 
            return {loading: false, error: action.payload}
        case ORDER_PAY_RESET: 
            return {}
        default:
            return state 
    }
}

// pay order
export const ordersDetailsReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
        case ORDERS_DETAILS_REQUEST: 
            return {loading: true, orders: []}
        case ORDERS_DETAILS_SUCCESS:
            return {loading: false, orders: action.payload, success: true}
        case ORDERS_DETAILS_FAIL: 
            return {loading: false, error: action.payload}
        case ORDERS_DETAILS_RESET: 
            return {orders:[]}
        default:
            return state 
    }
}

// ORDER DELIVERED
export const orderDeliveredReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDERS_DELIVERED_REQUEST: 
            return {loading: true}
        case ORDERS_DELIVERED_SUCCESS:
            return {loading: false, success: true}
        case ORDERS_DELIVERED_FAIL: 
            return {loading: false, error: action.payload}
        case ORDERS_DETAILS_RESET: 
            return {}
        default:
            return state 
    }
}