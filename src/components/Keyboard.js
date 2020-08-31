import React from 'react';
import Key from './Key'
import PropTypes from "prop-types";
import KeyboardEventHandler from 'react-keyboard-event-handler';

class Keyboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            debug: {
                show: false,
                lastKeyEvent: {}
            },
            pressedKeycodes: new Map(),
            rows: [
                [
                    {primary: 'Dead', display: '^'},
                    {primary: '1'},
                    {primary: '2'},
                    {primary: '3'},
                    {primary: '4'},
                    {primary: '5'},
                    {primary: '6'},
                    {primary: '7'},
                    {primary: '8'},
                    {primary: '9'},
                    {primary: '0'},
                    {primary: '-'},
                    {primary: '`'},
                    {primary: 'Backspace', display: '⟵', width: 1.8}
                ],
                [
                    {primary: 'Tab', display: '↹', width: 1.4},
                    {primary: 'X'},
                    {primary: 'V'},
                    {primary: 'L'},
                    {primary: 'C'},
                    {primary: 'W'},
                    {primary: 'K'},
                    {primary: 'H'},
                    {primary: 'G'},
                    {primary: 'F'},
                    {primary: 'Q'},
                    {primary: 'ẞ'},
                    {primary: '´'},
                ],
                [
                    {primary: 'AltGraph', display: 'M3', width: 1.8},
                    {primary: 'U'},
                    {primary: 'I'},
                    {primary: 'A'},
                    {primary: 'E'},
                    {primary: 'O'},
                    {primary: 'S'},
                    {primary: 'N'},
                    {primary: 'R'},
                    {primary: 'T'},
                    {primary: 'D'},
                    {primary: 'Y'},
                    {primary: 'AltGraph', display: 'M3'},
                ],
                [
                    {primary: 'Shift', display: 'M2', width: 1.3},
                    {primary: 'AltGraph', display: 'M4'},
                    {primary: 'Ü'},
                    {primary: 'Ö'},
                    {primary: 'Ä'},
                    {primary: 'P'},
                    {primary: 'Z'},
                    {primary: 'B'},
                    {primary: 'M'},
                    {primary: ','},
                    {primary: '.'},
                    {primary: 'J'},
                    {primary: 'Shift', display: 'M2', width: 2.5},
                ],
                [
                    {primary: 'Control', display: 'Strg', width: 1.8},
                    {primary: 'Alt', width: 1.8},
                    {primary: ' ', width: 7.85},
                    {primary: 'AltGraph', display: 'M4', width: 1.8},
                    {primary: 'Control', display: 'Strg', width: 1.8}
                ]
            ],
        };
    }

    handleKeyUp = (event) => this.handleKey(event, false)
    handleKeyDown = (event) => this.handleKey(event, true)
    handleKey = (event, isDownEvent) => {
        event.preventDefault();
        const key = event.key.charCodeAt(0)
        if ((event.key.length === 1 &&
            (key === 32 || key === 44 || key === 46 || key === 59 || key === 63 || key === 33 || // space, comma, period, semicolon, questionmark, exclamationmark
                key === 220 || key === 214 || key === 196 || key === 223 || key === 7838 || key === 228 || key === 246 || key === 252 || // german umlauts
                (key > 47 && key < 58) || // nummeric
                (key > 64 && key < 91) || // upper alpha (A-Z)
                (key > 96 && key < 123)))) { // lower alpha (a-z)

            let isStateChangeEvent = !event.repeat
            if (isStateChangeEvent) {
                console.log('keyState changed for code: ${event.code}')
                const newRows = this.state.rows.map(row => (
                    row.map(key => key.primary.localeCompare(event.key, undefined, {sensitivity: 'accent'}) === 0 ? {
                        ...key,
                        pressed: isDownEvent
                    } : key)
                ))
                this.setState(prevState => ({
                    pressedKeycodes: prevState.pressedKeycodes.set(event.code, isDownEvent),
                    rows: newRows
                }));
                if (isDownEvent) {
                    this.props.onCharacter(event.key)
                }
            }
        }
        this.setState(prevState => ({ debug: {...prevState.debug, lastKeyEvent: event}}))
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <KeyboardEventHandler
                        handleFocusableElements={true}
                        handleKeys={['all']}
                        onKeyEvent={(key, e) => this.handleKeyDown(e)}/>
                    <KeyboardEventHandler
                        handleEventType='keyup'
                        handleFocusableElements={true}
                        handleKeys={['all']}
                        onKeyEvent={(key, e) => this.handleKeyUp(e)}/>
                </div>
                <div className="Keyboard"
                     style={{textAlign: 'center'}}>
                    <p style={{fontSize: '16px'}}>Versuche den angezeigten Text so schnell wie möglich zu tippen.</p>
                    <div style={{
                        border: '8px solid #DDD',
                        maxWidth: '972px',
                        width: '972px',
                        borderRadius: '12px',
                        backgroundColor: '#272734'
                    }}>
                        {this.state.rows.map(row => (
                            <div className="KeyboardRow" style={{display: 'flex'}}>
                                {row.map(key => (
                                    <Key keyy={key}/>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='debug' style={debug(this.state.debug.show)}>
                    <style>{`.debug span { width: 250px;  min-width: 250px; display:inline-block}`}</style>
                    <span>event.key:</span><span>{this.state.debug.lastKeyEvent.key}</span><br/>
                    <span>event.code:</span><span>{this.state.debug.lastKeyEvent.code}</span><br/>
                    <span>event.location:</span><span>{this.state.debug.lastKeyEvent.location !== 0 ? this.state.debug.lastKeyEvent.location : ''}</span><br/>
                    <span>event.metaKey:</span><span>{this.state.debug.lastKeyEvent.metaKey ? 'true' : ''}</span><br/>
                    <span>event.altKey:</span><span>{this.state.debug.lastKeyEvent.altKey ? 'true' : ''}</span><br/>
                    <span>event.ctrlKey:</span><span>{this.state.debug.lastKeyEvent.ctrlKey ? 'true' : ''}</span><br/>
                    <span>event.shiftKey:</span><span>{this.state.debug.lastKeyEvent.shiftKey ? 'true' : ''}</span><br/>
                </div>
            </React.Fragment>
        );
    }
}

function debug(show) {
    return {
        color: 'purple',
        textAlign: 'right',
        paddingTop: '20px',
        display: show ? 'block' : 'none'
    }
};

Keyboard.propTypes = {
    onCharacter: PropTypes.func
};

export default Keyboard;

// FIXME Wir capture nicht nur das initiale runterdrücken der tasten, sondern dauerhaft input solange die Taste gedrückt ist...