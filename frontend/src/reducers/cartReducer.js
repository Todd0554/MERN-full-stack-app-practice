import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS 
} from "../contents/cartContents"

export const cartReducer = (state = {cartItems: [], postalAddress: {}}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const newItem = action.payload
            const existItem = state.cartItems.find((p) => p.product === newItem.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? newItem : x
                    )
                }
            }else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, newItem]
                }
            }
            case CART_REMOVE_ITEM:
                return {
                    ...state,
                    cartItems: state.cartItems.filter((p) => p.product !== action.payload)
                }
            case CART_SAVE_SHIPPING_ADDRESS:
                return {
                    ...state,
                    postalAddress: action.payload
                }
        default: return state
    }
}