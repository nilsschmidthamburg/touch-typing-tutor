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
            <div className="Trainer" style={{maxWidth: '988px'}}>
                <h3 style={textStyle}><span
                    style={cursorStyle}>{this.state.expectedChars.charAt(0)}</span>{this.state.expectedChars.substr(1)}&nbsp;
                </h3>
                <style>{`
            @keyframes "blink" {
                from, to {
                    color: white;
                    background-color: #282c34;
                }
                50% {
                    background-color: white;
                    color: #282c34;
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
    paddingBottom: '40px',
    padding: '14px',
    border: '1px solid',
    marginBottom: '50px',
    borderRadius: '6px'
};

const cursorStyle = {
    animation: '1s blink step-end infinite'
}

export default Trainer;
