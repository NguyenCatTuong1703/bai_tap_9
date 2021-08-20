import {
    GET_ALL_STUDENTS_FAILURE,
    GET_ALL_STUDENTS_LOADING,
    GET_ALL_STUDENTS_SUCCESS,
} from "../actions/studentAction";

const INIT_STATE = {
    studentsList: [],
    isLoading: false,
    error: "",
};

const studentReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_STUDENTS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_ALL_STUDENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                studentsList: action.payload,
            };
        case GET_ALL_STUDENTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default studentReducer;
