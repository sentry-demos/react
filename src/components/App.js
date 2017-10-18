import React, { Component } from 'react';
import logo from '../assets/sentry-glyph-black.png';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Sentry.io Demo -  Sample Error Page</h1>
                </div>
                <p className="App-intro">
                </p>
                {this.props.children}
            </div>
        );
    }
}

export default App;
