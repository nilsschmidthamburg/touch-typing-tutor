import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component {
    render() {
        return (
            <div style={counterStyle(this.props)}>
                <div style={value}>{prettyValue(this.props)}</div>
                <div style={unit}>{this.props.unit}</div>
            </div>
        );
    }
}

function prettyValue(props) {
    return props.unit === 'time' ? minSec(props.value) : props.value
}

function minSec(seconds) {
    return Math.floor(seconds / 60) + ':' + ("00" + seconds % 60).slice(-2);
}

function counterStyle(props) {
    return props.unit === 'time'
        ? {
            color: props.color,
            minWidth: '65px'
        }
        : {
            color: props.color
        };
}

const unit = {
    fontSize: '12px'
};

const value = {
    fontSize: '28px',
    fontWeight: 'bold'
};


Counter.propTypes = {
    color: PropTypes.string,
    value: PropTypes.number,
    unit: PropTypes.string,
};


export default Counter;
