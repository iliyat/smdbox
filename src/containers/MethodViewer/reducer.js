import * as METHOD_LIST_ACTION_TYPES from 'containers/Sidebar/actionTypes';
import * as ACTION_TYPES from './actionTypes';

const initialState = {
    loading: false,
    response: null,
    formData: {}
};

function SelectedMethodReducer(state = initialState, action) {
    switch (action.type) {
    case ACTION_TYPES.RUN_METHOD_REQUEST:
        return {
            ...state,
            loading: true,
            error: null
        };
    case ACTION_TYPES.RUN_METHOD_SUCCESS:
        return {
            ...state,
            loading: false,
            response: action.response,
            error: null
        };
    case ACTION_TYPES.RUN_METHOD_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.error
        };
    case ACTION_TYPES.HIDE_ERROR:
        return {
            ...state,
            error: null
        };
    case ACTION_TYPES.CHANGE_FORM_DATA:
        return {
            ...state,
            formData: action.formData
        };
    case METHOD_LIST_ACTION_TYPES.SELECT_SERVICE:
        return { ...initialState };
    default:
        return state;
    }
}

export default SelectedMethodReducer;
