import React from 'react';
import PropTypes from 'prop-types';

class Key extends React.Component {
    render() {
        return (
            <div style={{
                border: '1px solid #DDD',
                backgroundColor: this.props.keyy.pressed ? '#344a93' : '#272734',
                width: (this.props.keyy.width || 1) * 64 + 'px',
                height: (this.props.keyy.height || 1) * 64 + 'px',
                display: "flex"
            }} className="Key">
                <div style={{
                    paddingLeft: '10px',
                    paddingTop: '4px'
                }}>{this.props.keyy.display || this.props.keyy.primary}</div>
            </div>
        );
    }
}


Key.propTypes = {
    keyy: PropTypes.shape({
        primary: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        display: PropTypes.string,
        pressed: PropTypes.bool
    })
};


export default Key;
