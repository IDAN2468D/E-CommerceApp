const initialState = {
    name: "",
    email: "",
    password: "",
    showPassword: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_NAME":
            return { ...state, name: action.payload }
        case "SET_EMAIL":
            return { ...state, email: action.payload };
        case "SET_PASSWORD":
            return { ...state, password: action.payload };
        case "SET_SHOW_PASSWORD":
            return { ...state, showPassword: !state.showPassword };
        default:
            return state;
    }
};

export { initialState, reducer }