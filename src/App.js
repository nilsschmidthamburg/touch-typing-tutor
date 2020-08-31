import React from 'react';
import './App.css';
import {BrowserRouter as HashRouter, Link, Route, Switch} from 'react-router-dom';
import Trainer from "./components/Trainer";
import Terms from "./pages/Terms";
import Imprint from "./pages/Imprint";
import logo from "./images/logo.png"
import GitHubForkRibbon from 'react-github-fork-ribbon';

export default function App() {
    return (
        <HashRouter basename={process.env.PUBLIC_URL}>
            <React.Fragment>
                <header className="Header">
                    <Link style={linkStyle} to="/"><img style={imgStyle} src={logo} alt='logo'/>
                        <div
                            style={headerStyle}>Neo Tipp Trainer
                        </div>
                    </Link>
                </header>
                <div className="Main">
                    <Switch>
                        <Route exact path="/" component={Trainer}/>
                        <Route path="/terms" component={Terms}/>
                        <Route path="/imprint" component={Imprint}/>
                    </Switch>
                </div>
                <footer className="Footer">
                    © Copyright 2020 Nils Schmidt{/*&nbsp;|&nbsp;<Link to="/imprint">Impressum</Link>&nbsp;|&nbsp;<Link
                    to="/terms">Datenschutz</Link>*/}
                </footer>
                <GitHubForkRibbon href="https://github.com/nilsschmidthamburg/touch-typing-tutor/"
                                  target="_blank"
                                  position="right-bottom"
                                  color="black">Fork me on GitHub</GitHubForkRibbon>
            </React.Fragment>
        </HashRouter>
    );
}

const imgStyle = {
    width: '28px',
    paddingRight: '12px',
    float: 'left'
};

const linkStyle = {
    padding: '8px 8px 10px 12px',
    float: 'inline-start'
};

const headerStyle = {
    margin: '0',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'lightslategray',
    float: 'left'
};
