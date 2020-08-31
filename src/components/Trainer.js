import React from 'react';
import Keyboard from "./Keyboard";
import Counter from "./Counter";

class Trainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expectedChars: "Neo ist eine ergonomische Tastaturbelegung, welche für die deutsche Sprache optimiert ist.",
            secondsElapsed: 0,
            errors: 0,
            words: 0,
            chars: 0
        };
    }

    onCharacter = (char) => {
        if (this.state.expectedChars.length > 0) {
            if (!this.timer) {
                this.timer = setInterval(() => this.setState(prevState => ({
                    secondsElapsed: prevState.secondsElapsed + 1
                })), 1000);
            }
            if (this.state.expectedChars.charAt(0) === char) {
                if (this.state.expectedChars.length === 1) {
                    console.log("YEAH!!!!" + char);
                    this.setState(prevState => ({
                        words: prevState.words + 1
                    }));
                    clearInterval(this.timer)
                }
                this.setState(prevState => ({
                    expectedChars: this.state.expectedChars.substring(1),
                    chars: prevState.chars + 1,
                    // FIXME Word counter must count linebreaks as well!
                    // FIXME Word counter must not double count multiple whitespaces.
                    words: char === ' ' ? prevState.words + 1 : prevState.words
                }));

            } else {
                this.setState(prevState => ({errors: prevState.errors + 1}))
            }
        }
    };

    render() {
        return (
            <div className="Trainer" style={{maxWidth: '988px'}}>
                <div className='counters' style={counters}>
                    <div style={rightFloater}></div>
                    <Counter color='#BB86FC' unit='words/min'
                             value={perMinute(this.state.words, this.state.secondsElapsed)}></Counter>
                    <Counter color='#03DAC5' unit='chars/min'
                             value={perMinute(this.state.chars, this.state.secondsElapsed)}></Counter>
                    <Counter color='#FF0266' unit='errors' value={this.state.errors}></Counter>
                    <Counter color='whitesmoke' unit='time' value={this.state.secondsElapsed}></Counter>
                </div>
                <h3 style={textStyle}><span
                    style={cursorStyle}>{this.state.expectedChars.charAt(0)}</span>{this.state.expectedChars.substr(1)}&nbsp;
                </h3>
                <style>{`
            .counters > div {
                margin-left: 48px;
            }
            
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

function perMinute(value, seconds) {
    return seconds === 0 ? 0 : Math.floor(value * 60 / seconds)
}

const counters = {
    display: 'flex',
    width: '100%'
};

const rightFloater = {
    flex: '1 0 auto',
};

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
};

export default Trainer;
