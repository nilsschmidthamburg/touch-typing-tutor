import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Trainer from "./components/Trainer";
import Terms from "./pages/Terms";
import Imprint from "./pages/Imprint";

export default function App() {
    return (
        <Router>
            <React.Fragment>
                <div className="App">
                    <h2 style={{paddingBottom: '100px'}}><Link style={{color: 'white'}} to="/">Neo
                        Touch Typing Tutor</Link></h2>
                    <Switch>
                        <Route exact path="/" component={Trainer}/>
                        <Route path="/terms" component={Terms}/>
                        <Route path="/imprint" component={Imprint}/>
                    </Switch>
                </div>
                <footer className="Footer">
                    © Copyright 2020 Nils Schmidt&nbsp;|&nbsp;<Link to="/imprint">Impressum</Link>&nbsp;|&nbsp;<Link
                    to="/terms">Datenschutz</Link>
                </footer>
            </React.Fragment>
        </Router>
    );
}