import URL from 'url-parse';
import * as ACTION_TYPES from './actionTypes';

const initialState = {
    smdScheme: null,
    headers: {},
    endpoint: null,
    smdUrl: null,
    created: false,
    fetchingSchema: false,
    fetchingSmdError: false,
    settingsOpen: false
};


function createProjectReducer(state = initialState, action) {
    switch (action.type) {
    case ACTION_TYPES.FETCH_REQUEST:
        return { ...state, fetchingSchema: true };
    case ACTION_TYPES.FETCH_SUCCESS: {
        let url = action.smdUrl.replace(/\?smd/, '')
        if (url === action.smdUrl) {
            const parsedUrl = new URL(action.smdUrl);
            url = `${parsedUrl.origin}${action.smdScheme.target || ''}`
        }
        return { ...state,
            smdScheme: action.smdScheme,
            smdUrl: action.smdUrl,
            endpoint: action.isRefresh ? state.endpoint : url,
            fetchingSchema: false,
            fetchingSmdError: false
        };
    }
    case ACTION_TYPES.FETCH_ERROR:
        return { ...state, fetchingSchema: false, fetchingSmdError: true };
    case ACTION_TYPES.CREATE:
        return {
            ...state,
            ...action.params,
            created: true
        };
    case ACTION_TYPES.OPEN_SETTINGS:
        return {
            ...state,
            settingsOpen: true
        };
    case ACTION_TYPES.CLOSE_SETTINGS:
        return {
            ...state,
            settingsOpen: false
        };
    case ACTION_TYPES.CLEAR:
        return { ...initialState };

    default:
        return state;
    }
}

export default createProjectReducer;
