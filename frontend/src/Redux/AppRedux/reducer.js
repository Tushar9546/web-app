import * as types from "./actionTypes";

const initalState = {
    isLoading: false,
    isError: false,
    AllDataList: [],
}

const reducer = (state = initalState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_DATA_REQUEST:
            return { ...state, isLoading: true, AllDataList: [], isError: false }
        case types.GET_DATA_SUCCESS:
            return { ...state, isLoading: false, AllDataList: payload, isError: false }
        case types.GET_DATA_FAILURE:
            return { ...state, isError: true, AllDataList: [], isLoading: false }

        default:
            return state;
    }
}

export { reducer }