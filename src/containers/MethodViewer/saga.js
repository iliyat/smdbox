import { call, put, select, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { getHeaders, getEndPoint } from 'containers/Project/selectors';
import { getSelectedMethod } from 'containers/Sidebar/selectors';
import { createRequest } from 'helpers/rpc';

import * as ACTION_TYPES from './actionTypes';
import * as Actions from './actions';

function* onRunMethod(action) {
    try {
        const state = yield select();
        
        const method = getSelectedMethod(state);
        const rpcRequestParams = action.raw ? action.params : createRequest({ method, params: action.params.formData });
        const headers = getHeaders(state);
        const endpoint = getEndPoint(state);
        
        yield put(Actions.runMethodRequest());
        const response = yield call(axios.post, endpoint, rpcRequestParams, { headers });
        
        if (response.data.error) {
            yield put(Actions.runMethodFailure(response.data.error));
            return;
        }
        
        yield put(Actions.runMethodSuccess(response.data.result));
    } catch (e) {
        yield put(Actions.runMethodFailure({ message: e.toString() }));
    }
}

export default function* SelectedMethodSaga() {
    yield [
        takeEvery(ACTION_TYPES.RUN_METHOD, onRunMethod)
    ];
}
