import React from 'react';
import PropTypes from 'prop-types';

import bemCl from 'bem-cl';
import JSONTree from 'react-json-tree';
import { Tabs, Tab, Button, FormControl } from 'react-bootstrap';
import copy from 'copy-to-clipboard';
import theme from './theme';
import './JsonViewer.scss';

const b = bemCl('sb-json-viewer');


class JsonViewer extends React.PureComponent {
    static propTypes = {
        json: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        title: PropTypes.string
    };
    static defaultProps = {
        json: {},
        title: 'Response'
    };
    
    getRawJson() {
        try {
            return JSON.stringify(this.props.json, null, 2);
        } catch (err) {
            return '';
        }
    }
    
    copyToClipboard = () => {
        copy(this.getRawJson());
    };

    render() {
        return (
            <div className={b()}>
                <h4>
                    {this.props.title}
                    <div className={b('clipboard-button')}>
                        <Button bsSize="xsmall" onClick={this.copyToClipboard}>Copy to clipboard</Button>
                    </div>
                </h4>
                <Tabs
                    defaultActiveKey={1}
                    id="json-viewer-tabs"
                    mountOnEnter
                    unmountOnExit
                >
                    <Tab eventKey={1} title="Formatted">
                        {
                            this.props.json && (
                                <JSONTree data={this.props.json} theme={theme} />
                            )
                        }
                    </Tab>
                    <Tab eventKey={2} title="Raw">
                        <div className={b('raw')}>
                            <FormControl
                                className={b('textarea').toString()}
                                componentClass="textarea"
                                disabled
                                value={this.getRawJson()}
                                placeholder="Raw JSON"
                            />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}


export default JsonViewer;
