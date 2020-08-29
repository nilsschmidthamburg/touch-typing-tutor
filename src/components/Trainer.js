import React from 'react';
import Keyboard from "./Keyboard";

class Trainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expectedChars: "Neo ist eine ergonomische Tastaturbelegung, welche für die deutsche Sprache optimiert ist."
        };
    }

    onCharacter = (char) => {
        if (this.state.expectedChars.length > 0 && this.state.expectedChars.charAt(0) === char) {
            this.setState({expectedChars: this.state.expectedChars.substring(1)})
            console.log("YEAH!!!!" + char)
        } else {
            // do something to indicate error
            console.log(char)
        }
    }

    render() {
        return (
            <div className="Trainer" style={{maxWidth: '975px'}}>
                <h3 style={textStyle}><span
                    style={cursorStyle}>|</span>{this.state.expectedChars}</h3>
                <style>{`
            @keyframes "blink" {
    from, to {
        opacity: 0;
    }
    50% {
        opacity: 100;
    }
}
        `}</style>
                <Keyboard onCharacter={this.onCharacter}/>
            </div>
        );
    }
}

const textStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingBottom: '40px'
};

const cursorStyle = {
    fontWeight: '100',
    animation: '1s blink step-end infinite'
}
/*
@keyframes "blink" {
    from, to {
        color: transparent;
    }
    50% {
        color: black;
    }
}*/

export default Trainer;
