const initialState = {
    products: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload }
        default:
            return state
    }
}

export { initialState, reducer }