import React from 'react';
import Key from './Key'
import PropTypes from "prop-types";

class Keyboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    handleKey = (event, pressed) => {
        const code = event.key.charCodeAt(0)
        if ((event.key.length === 1 &&
            (code === 32 || code === 44 || code === 46 || code === 59 || code === 63 || code === 33 || // space, comma, period, semicolon, questionmark, exclamationmark
                code === 220 || code === 214 || code === 196 || code === 223 || code === 7838 || code === 228 || code === 246 || code === 252 || // german umlauts
                (code > 47 && code < 58) || // nummeric
                (code > 64 && code < 91) || // upper alpha (A-Z)
                (code > 96 && code < 123)))) { // lower alpha (a-z)

            const newRows = this.state.rows.map(row => (
                row.map(key => key.primary.localeCompare(event.key, undefined, {sensitivity: 'accent'}) === 0 ? {
                    ...key,
                    pressed: pressed
                } : key)
            ))
            this.setState({rows: newRows});
            this.props.onCharacter(event.key)
        }
        console.log(event.key.length + "    " + event.key + "    " + code)
    }

    render() {
        return (
            <div className="Keyboard"
                 onKeyDown={this.handleKeyDown}
                 onKeyUp={this.handleKeyUp}
                 tabIndex={-1}
            style={{textAlign: 'center'}}>
                <p style={{fontSize: '16px'}}>Click on the virtual keyboard, then start typing!</p>
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
        );
    }
}

Keyboard.propTypes = {
    onCharacter: PropTypes.func
};

export default Keyboard;

// FIXME Wir capture nicht nur das initiale runterdrücken der tasten, sondern dauerhaft input solange die Taste gedrückt ist...