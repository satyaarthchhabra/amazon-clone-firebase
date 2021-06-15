export const initialState = {
    cart: [],
    user: null,
    totalOrders:[],
    users:[],  
    profile: null,
    products: [],
    displayProducts:[]
}

export const getCartTotal = (cart) =>
    cart?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {

    switch (action.type) {
        case 'ADD_TO_CART':
            // Logic for adding item to cart
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }

        case 'EMPTY_BASKET':
            return {
                ...state,
                cart: []
            }
        case 'SET_DISPLAY_PRODUCTS':
            return {
                ...state,
                displayProducts: action.payload
            }

        case 'REMOVE_FROM_CART':
            // Logic for removing item from cart
            let newCart = [...state.cart]

            const index = state.cart.findIndex(
                item => item.id === action.payload
            )

            if (index >= 0)
                newCart.splice(index, 1)
            else
                console.warn(`can't remove product as ID ${action.payload} is not available`)

            return {
                ...state,
                cart: newCart
            }

        /*
        return {
            ...state,
            cart: state.cart.filter(item => item.id !== action.payload)
        }
        */
        case 'ADD_TO_PRODUCTS':
            // Logic for adding item to cart
            return {
                ...state,
                products: action.payload
            }
        case 'SET_ALL_USERS':
            // Logic for adding item to cart
            return {
                ...state,
                users: action.payload
            }
        case 'SET_TOTAL_ORDERS':
            // Logic for adding item to cart
            return {
                ...state,
                totalOrders: action.payload
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.userName
            }
        default:
            return state
    }
}

export default reducer