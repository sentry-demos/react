/*global undefinedVariable:false Raven:false*/
/*eslint no-unused-vars:0 no-eval:0*/

import React, { Component } from 'react';
import logo from '../assets/sentry-glyph-black.png';

class Errors extends Component {
    constructor(props) {
        super(props);
    }

    notAFunctionError() {
        var obj = {};
        obj.attributeInvalid();
    }

    uriError() {
        decodeURIComponent('%');
    }

    typeError() {
        null.f();
    }

    syntaxError() {
        eval('foo bar');
    }

    referenceError() {
        var a = undefinedVariable;
    }

    rangeError() {
        throw new RangeError('Parameter must be between 1 and 100');
    }

    evalError() {
        throw new EvalError('Hello', 'someFile.js', 10);
    }

    render() {
        const user = this.props.location.state;

        return (
            <div>
                <h2>Hi, {user ? user.email : "Guest"}.</h2>
                <p>Welcome the list of sample errors. <br/>
                This is where you can specify your DSN and send errors/exceptions to Sentry.</p>
                <div>
                    <ul className="center list-group">
                        <li className="list-group-item" onClick={this.notAFunctionError}>
                            <h3>TypeError</h3>
                            <p>obj.attributeInvalid is not a function</p>
                        </li>
                        <li className="list-group-item" onClick={this.uriError}>
                            <h3>URIError</h3>
                            <p>URI malformed </p>
                        </li>
                        <li className="list-group-item" onClick={this.typeError}>
                            <h3>Uncaught TypeError</h3>
                            <p>Cannot read property 'f' of null</p>
                        </li>
                        <li className="list-group-item" onClick={this.syntaxError}>
                            <h3>SyntaxError</h3>
                            <p>Unexpected identifier</p>
                        </li>
                        <li className="list-group-item" onClick={this.referenceError}>
                            <h3>ReferenceError</h3>
                            <p>undefinedVariable is not defined</p>
                        </li>
                        <li className="list-group-item" onClick={this.rangeError}>
                            <h3>RangeError</h3>
                            <p>Parameter must be between 1 and 100</p>
                        </li>
                        <li className="list-group-item" onClick={this.evalError}>
                            <h3>EvalError</h3>
                            <p>Hello</p>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}

export default Errors;
