import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailReducer, productListReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { 
    userLogInReducer, 
    userRegisterReducer, 
    getUserProfileReducer,
    updateUserProfileReducer
} from './reducers/userReducers'
import {orderCreateReducer} from './reducers/orderReducer'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    userLogIn: userLogInReducer,
    userRegister: userRegisterReducer,
    userDetails: getUserProfileReducer,
    updateDetails: updateUserProfileReducer,
    orderCreate: orderCreateReducer
})

// get cart details
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

// get the login user
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

// get postal address
const postalAddressStorage = localStorage.getItem('postalAddress') ? JSON.parse(localStorage.getItem('postalAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        postalAddress: postalAddressStorage
    },
    userLogIn: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store