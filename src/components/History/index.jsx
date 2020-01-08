import React from 'react';
import bemCl from 'bem-cl';
import PropTypes from 'prop-types';
import { Col, Row, Tabs, Tab } from 'react-bootstrap';

import JsonViewer from 'components/JsonViewer';

import './History.scss';

const b = bemCl('sb-history');

class History extends React.Component {
    static propTypes = {
        selectedItem: PropTypes.object,
        selectItem: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(PropTypes.object)
    }
    
    static defaultProps = {
        selectedItem: null,
        items: []
    }
    renderListItem = (item) => {
        return (
            <li
                key={item.id}
                onClick={() => { this.props.selectItem(item); }}
                className={(this.props.selectedItem && this.props.selectedItem.id === item.id) ? 'active' : ''}
            >
                <a onClick={e => e.nativeEvent.preventDefault()}>{ item.method }</a>
            </li>
        );
    };
    
    renderSelectedItem = () => {
        if (!this.props.selectedItem) return null;
        return (
            <Tabs
                defaultActiveKey={1}
                id="history-item-tabs"
            >
                <Tab eventKey={1} title="Response">
                    <JsonViewer title="Response data" json={this.props.selectedItem.response} />
                </Tab>
                <Tab eventKey={2} title="Request params">
                    <JsonViewer title="Request params" json={this.props.selectedItem.formData} />
                </Tab>
            </Tabs>
        );
    };
    
    render() {
        return (
            <div className={b()}>
                <Row>
                    <Col md={3}>
                        <ul className="nav nav-pills nav-stacked">
                            {
                                this.props.items.map((historyItem) => {
                                    return this.renderListItem(historyItem);
                                })
                            }
                        </ul>
                    </Col>
                    <Col md={9}>
                        {
                            this.renderSelectedItem()
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default History;
