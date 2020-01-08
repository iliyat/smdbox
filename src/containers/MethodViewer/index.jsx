import { connect } from 'react-redux';

import MethodViewer from 'components/MethodViewer';
import { getSelectedMethod } from 'containers/Sidebar/selectors';

import { runMethod, hideError, changeFormData } from './actions';
import { getSelectedMethodSchema, getSelectedMethodFullState } from './selectors';

export default connect(
    state => ({
        methodSchema: getSelectedMethodSchema(state),
        selectedMethod: getSelectedMethod(state),
        state: getSelectedMethodFullState(state)
    }),
    {
        runMethod,
        hideError,
        changeFormData
    }
)(MethodViewer);
