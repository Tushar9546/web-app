import * as types from "./actionTypes";

const initalState = {
    isLoading: false,
    isError: false,
    isAuth: false,
}

const reducer = (state = initalState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SIGNUP_REQUEST:
            return { ...state, isLoading: true, isError: false }
        case types.SIGNUP_SUCCESS:
            return { ...state, isLoading: false, isError: false }
        case types.SIGNUP_FAILURE:
            return { ...state, isError: true, isLoading: false }

        case types.LOGIN_REQUEST:
            return { ...state, isError: false, isLoading: true, isAuth: false, }
        case types.LOGIN_SUCCESS:
            return { ...state, isError: false, isLoading: false, isAuth: true, }
        case types.LOGIN_FAILURE:
            return { ...state, isError: true, isLoading: false, isAuth: false, }
        default:
            return state;
    }
}

export { reducer }