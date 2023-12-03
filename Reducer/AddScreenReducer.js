const initialState = {
    name: "",
    mobileNo: "",
    houseNo: "",
    street: "",
    landmark: "",
    postalCode: "",
    mustRegister: "",
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_NAME":
            return { ...state, name: action.payload }
        case "SET_MOBILE_NO":
            return { ...state, mobileNo: action.payload }
        case "SET_HOUSE_NO":
            return { ...state, houseNo: action.payload }
        case "SET_STREET":
            return { ...state, street: action.payload }
        case "SET_LANDMARK":
            return { ...state, landmark: action.payload }
        case "SET_POSTAL_CODE":
            return { ...state, postalCode: action.payload }
        case "MUST_REGISTER":
            return { ...state, mustRegister: !state.mustRegister }
        default:
            return state
    }
}

export { initialState, reducer }