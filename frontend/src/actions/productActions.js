import { 
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS,
} from "../contents/productContents";
import axios from "axios"

// action for getting all the products
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const { data } = await axios.get('/api/products')
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

// action for getting one product detail
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAIL_REQUEST})
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({type: PRODUCT_DETAIL_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

